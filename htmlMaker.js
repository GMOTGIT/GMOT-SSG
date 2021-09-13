const fs = require("fs");

module.exports = htmlMaker = (txtInput, argv_o, argv_s, argv_i) => {
  //Ignore non txt files
  if (txtInput.indexOf(".txt") == -1) {
    console.error("File ignored, not a txt format: ", txtInput);
    return;
  }

  //Create readStream, from directory or root folder file
  //Check for Paths, is it inside the folder? Its not? What if its mixed?

  if (argv_i.indexOf(":") != -1) {
    var isFolder = fs.statSync(argv_i);
    var s = fs.createReadStream(
      `${isFolder.isDirectory() ? argv_i + "/" + txtInput : txtInput}`
    );
  } else {
    var isFolder = fs.statSync("./" + argv_i);

    var s = fs.createReadStream(
      `${isFolder.isDirectory() ? "./" + argv_i + "/" + txtInput : txtInput}`
    );
  }

  //https://github.com/yargs/yargs/blob/HEAD/docs/examples.md
  //Yargs is here to help you...

  let lines = [];

  s.on("data", function (buf) {
    lines = buf.toString().split(/\r?\n\r?\n/);
  });

  s.on("end", function () {
    let paragraphs = "";
    let title = `<h1>${lines.shift()}</h1>`;
    //let title = `<h1>${lines.shift()}</h1></br>`;

    lines.forEach((string) => {
      paragraphs += `<p>${string}</p>`;
      //paragraphs += `<p>${string}</p></br>`;
    });

    let styleSheet = argv_s
      ? `<link rel="stylesheet" href=${argv_s}></link>`
      : "";

    let fileName = txtInput.split(".txt").shift();

    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${fileName}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
${styleSheet}
</head>
<body>
${title}
${paragraphs}
</body>
</html>`;

    //Check for output

    //Check if output is inside the main folder
    //if outside then save it there
    if (argv_o) {
      if (argv_o.indexOf("./") == -1) {
        if (txtInput.includes("\\")) {
          //check if receiving an absolute path
          let index = txtInput.lastIndexOf("\\");
          let path = txtInput.substring(txtInput.length, index);
          txtInput = path;
        }

        fs.writeFile(`${argv_o}/${fileName}.html`, content, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
        return;
      }

      fs.writeFile(`./${argv_o}/${fileName}.html`, content, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      return;
    }

    // //check here
    //Check if input file has absolute path
    if (txtInput.includes("\\")) {
      let index = txtInput.lastIndexOf("\\");
      let path = txtInput.substring(txtInput.length, index);

      fs.writeFile(
        `${"./dist/" + path.split(".txt").shift()}.html`,
        content,
        (err) => {
          if (err) {
            console.error(err);

            console.log("IHERE");
            return;
          }
        }
      );
    }

    //check if input file is in root folder
    if (!txtInput.includes("\\")) {
      //default output - dist folder created before
      fs.writeFile(`${"./dist/" + fileName}.html`, content, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  });
};

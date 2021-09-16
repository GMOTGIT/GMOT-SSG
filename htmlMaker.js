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
  } else {
    var isFolder = fs.statSync("./" + argv_i);
  }

  //https://github.com/yargs/yargs/blob/HEAD/docs/examples.md
  //Yargs is here to help you...

  //   var s = fs.createReadStream(
  //     `${isFolder.isDirectory() ? "./" + argv_i + "/" + txtInput : txtInput}`
  //   );

  //s.on Bugging on The Naval Treaty
  // s.on("data", function (buf) {
  // lines = buf.toString().split(/\r?\n\r?\n/);
  // });

  // s.on("end", function () {}

  fs.readFile(
    `${isFolder.isDirectory() ? argv_i + "/" + txtInput : txtInput}`,
    "utf8",
    (err, lines) => {
      if (err) {
        console.error(err);
        return;
      }
      let paragraphs = "";

      lines = lines.toString().split(/\r?\n\r?\n/);

      let title = lines.shift();
      lines.forEach((string) => {
        paragraphs += `<p>${string}</p>\n`;
      });

      let h1 = title ? `<h1>${title}</h1>` : "";
      let styleSheet = argv_s ? `<link rel="stylesheet" href=${argv_s}>` : "";

      const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
${styleSheet}
</head>
<body>
${h1}
${paragraphs}
</body>
</html>`;

      if (argv_o) {
        if (argv_o.indexOf("./") == -1) {
          if (txtInput.includes("\\")) {
            //check if receiving an absolute path
            let index = txtInput.lastIndexOf("\\");
            let path = txtInput.substring(txtInput.length, index);
            txtInput = path.split(".txt").shift();
          }

          fs.writeFile(
            `${argv_o}/${txtInput.split(".txt").shift()}.html`,
            content,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
          return;
        }

        fs.writeFile(
          `./${argv_o}/${txtInput.split(".txt").shift()}.html`,
          content,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
        return;
      }

      //Check if input file has absolute path
      if (txtInput.includes("\\")) {
        let index = txtInput.lastIndexOf("\\");
        var path = txtInput.substring(txtInput.length, index);

        fs.writeFile(
          `${"./dist" + path.split(".txt").shift()}.html`,
          content,
          (err) => {
            if (err) {
              console.error(err);

              return;
            }
          }
        );
        return;
      }

      fs.writeFile(
        `${"./dist/" + txtInput.split(".txt").shift()}.html`,
        content,
        (err) => {
          if (err) {
            console.error(err);

            return;
          }
          return;
        }
      );
    }
  );
};

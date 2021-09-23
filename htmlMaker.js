const fs = require("fs");
const path = require("path");

module.exports = htmlMaker = (txtInput, argv_o, argv_s, argv_i) => {
  //Ignore non txt files
  if (txtInput.indexOf(".txt") == -1 && path.extname(txtInput) != '.md') {
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
        if (path.extname(txtInput) == '.md') {
          string = string
            .replace(/\*{2,}(.*?)\*{2,}/g, '<b>$1</b>')
            .replace(/\*(.*?)\*/g, '<i>$1</i>')
            .replace(/^##((.|\s)*$)/, '<h2>$1</h2>')
            .replace(/^#((.|\s)*$)/, '<h1>$1</h1>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        }
        paragraphs += (string.match(/<h1>/) || string.match(/<h2>/)) ? `${string}\n` : `<p>${string}</p>\n`;
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
          fs.writeFile(
            `${argv_o}/${path.parse(path.basename(txtInput)).name}.html`,
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
          `./${argv_o}/${path.parse(path.basename(txtInput)).name}.html`,
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
        fs.writeFile(
          `${"./dist" + path.parse(path.basename(txtInput)).name}.html`,
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
        `${"./dist/" + path.parse(path.basename(txtInput)).name}.html`,
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
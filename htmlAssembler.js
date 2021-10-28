const path = require("path");
var md = require("markdown-it")();

module.exports = htmlAssembler = (lines, txtInput, ss = "", argv_l) => {
  let paragraphs = "";

  lines = lines.toString().split(/\r?\n\r?\n/);

  let title = lines.shift();
  lines.forEach((string) => {
    if (path.extname(txtInput) == ".md") {
      var string = md.render(string);
    }

    if (path.extname(txtInput) == ".txt") {
      paragraphs +=
        string.match(/<h1>/) || string.match(/<h2>/) || string.match(/<hr>/)
          ? `${string}\n`
          : `<p>${string}</p>\n`;
    } else {
      paragraphs += string;
    }
  });

  let styleSheet = ss ? `<link rel="stylesheet" href="${ss}"></link>` : "";
  let h1 = title ? `<h1>${title}</h1>` : "";

  const content = `<!doctype html>
<html lang="${argv_l}">
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

  return content;
};

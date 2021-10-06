const path = require("path");

module.exports = htmlAssembler = (lines, txtInput, ss = "", argv_l) => {
  let paragraphs = "";

  lines = lines.toString().split(/\r?\n\r?\n/);

  let title = lines.shift();
  lines.forEach((string) => {
    if (path.extname(txtInput) == ".md") {
      string = string
        .replace(/\*{2,}(.*?)\*{2,}/g, "<b>$1</b>")
        .replace(/\*(.*?)\*/g, "<i>$1</i>")
        .replace(/^##((.|\s)*$)/, "<h2>$1</h2>")
        .replace(/^#((.|\s)*$)/, "<h1>$1</h1>")
        .replace(/^---((.|\s)*$)/, "<hr>")
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    }

    paragraphs +=
      string.match(/<h1>/) || string.match(/<h2>/) || string.match(/<hr>/)
        ? `${string}\n`
        : `<p>${string}</p>\n`;
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

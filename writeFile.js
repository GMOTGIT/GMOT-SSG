/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");


module.exports = writeFile = (argv_o = "dist", txtInput, content) => {
  fs.writeFile(
    `${path.normalize(argv_o)}/${
      path.parse(path.basename(txtInput)).name
    }.html`,
    content,
    (err) => {
      if (err) {
        console.error("An error have ocurred: ", err);

        process.exit(1);
      }
    }
  );
};

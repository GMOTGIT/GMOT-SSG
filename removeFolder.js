const fs = require("fs");

module.exports = removeFolder = function (dist) {
  if (fs.existsSync(dist)) {
    const oldFiles = fs.readdirSync(dist);

    //check if there is files inside the folder
    if (oldFiles.length > 0) {
      oldFiles.forEach((oldFile) => {
        if (fs.statSync(dist + "/" + oldFile).isDirectory()) {
          removeDir(dist + "/" + oldFile);
        } else {
          fs.unlinkSync(dist + "/" + oldFile);
        }
      });
      //remove dist after its empty
      fs.rmdirSync(dist);
      return;
    }
    //if its empty just remove it
    fs.rmdirSync(dist);
  }
};

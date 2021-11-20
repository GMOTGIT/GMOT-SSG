const execa = require("execa");
async function runSSG(...args) {
  try {
    const result = await execa.node("./GMOT-SSG.js", args);
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = runSSG;
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [file or directory]")
  .example(
    "$0 SSG -i myExample.txt directoryPath",
    "myExample.html and txtFromDirectory.html is created"
  )
  .alias("l", "lang")
  .alias("i", "input")
  .array("i")
  .describe("i", "Load a file or a directory")
  .help("h")
  .alias("h", "help")
  .alias("o", "output")
  .describe("o", "Set a directory for output")
  .alias("s", "stylesheet")
  .describe("s", "Set a stylesheet for the template")
  .version()
  .alias("v", "version")
  .alias("c", "config")
  .describe("c", "Receive a Config File and read input from it")
  .epilog("copyright 2021").argv;

  module.exports = argv;
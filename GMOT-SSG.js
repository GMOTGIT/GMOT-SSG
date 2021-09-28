#!/usr/bin/env node

//Optional Features
// -s --stylesheet
// -o --output // also create a new dir if it does not exist
// <h1>Title</h1>
//read mix input, relative or absolute paths - ex: my ssg -i thisIsaTxtfile.txt thisIsaDirectory C://user/Desktop/thisIsAlsoAnotherDirectory

const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const htmlMaker = require("./htmlMaker");

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
  .epilog("copyright 2021").argv;

//Check for Arguments
if (!argv.i) {
  // print a useful error message
  console.error("One or more txt files or a directory are needed");
  // exit the program with a non-zero return code
  process.exit(1);
}

if (!argv.i.length > 0) {
  console.error("Error: List of input is empty!");
  process.exit(1);
}

//check if output is valid
if (argv.o) {
  if (!fs.existsSync(argv.o)) {
    //check this condition
    if (typeof argv.o == "boolean") {
      // print a useful error message
      console.error("Missing Output Directory");
      // exit the program with a non-zero return code
      process.exit(1);
    }
    fs.mkdirSync(path.normalize(argv.o), { recursive: true }, function (err) {
      if (err) {
        console.error("An error have ocurred: ", err);
        process.exit(1);
      }
    });
  }
}

//If no custom output, if none then make Dist. if Dist already exist, replace it.

if (!argv.o) {
  if (fs.existsSync("./dist")) {
    const oldFiles = fs.readdirSync("./dist");

    //check if there is files inside the folder
    if (oldFiles.length > 0) {
      oldFiles.forEach((oldFile) => {
        if (fs.statSync("./dist/" + oldFile).isDirectory()) {
          removeDir("./dist/" + oldFile);
        } else {
          fs.unlinkSync("./dist/" + oldFile);
        }
      });
    }
    //if its empty just remove it
    fs.rmdirSync("./dist");
  }

  // Make dist directory
  fs.mkdirSync("./dist", { recursive: true }, function (err) {
    if (err) {
      console.error("An error have ocurred: ", err);
      process.exit(1);
    }
  });
}

//Check if input is directory
argv.i.forEach((input) => {
  if (!fs.existsSync(path.normalize(input))) {
    console.error(`Input Ignored: ${input} is not a file or Directory!`);
    return;
  }

  let checkInput = fs.statSync(path.normalize(input));

  if (checkInput && checkInput.isDirectory()) {
    let files;

    files = fs.readdirSync(path.normalize(input));

    if (files) {
      files.forEach((txtInput) => {
        htmlMaker(txtInput, argv.o, argv.s, path.normalize(input), argv.l);
      });
    }
  }

  if (checkInput && !checkInput.isDirectory()) {
    if (checkInput.isFile()) htmlMaker(input, argv.o, argv.s, "", argv.l);
  }
});

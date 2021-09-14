#!/usr/bin/env node

// TODO:
//Check for redundant code

//Optional Features
// -s --stylesheet
// -o --output
// <h1>Title</h1>
//read mix input, relative or absolute paths - ex: my ssg -i thisIsaTxtfile.txt thisIsaDirectory C://user/Desktop/thisIsAlsoAnotherDirectory

//Week 2 - Implement this:
//use __dirname and __filename and path

const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const htmlMaker = require("./htmlMaker");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [file or directory]")
  .example(
    "$0 SSG -i myExample.txt directoryPath",
    "myExample.html and txtFromDirectory.html is created"
  )
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

console.log(__dirname);
//Check for Arguments
if (!argv.i) {
  console.error("One or more txt files or a directory are needed");
}

//check if output is valid
if (argv.o) {
  if (!fs.existsSync(argv.o) && !fs.existsSync("./" + argv.o)) {
    //check this condition
    console.error("Output is not a valid Directory: ", argv.o);
    return;
  }
}

//If no custom output, if none then make Dist. if Dist already exist, replace it.

if (!argv.o) {
  if (fs.existsSync("./dist")) {
    const oldFiles = fs.readdirSync("./dist");

    //check if there is files inside the folder
    if (oldFiles.length > 0) {
      oldFiles.forEach((oldFile) => {
        if (fs.statSync("./dist" + "/" + oldFile).isDirectory()) {
          removeDir("./dist" + "/" + oldFile);
        } else {
          fs.unlinkSync("./dist" + "/" + oldFile);
        }
      });
    }
    //if its empty just remove it
    fs.rmdirSync("./dist");
  }

  // Make dist directory
  fs.mkdir("./dist", { recursive: true }, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

//Check for input -- Do i need to check it again?
//probably not

if (argv.i && argv.i.length > 0) {
  // this if can be removed

  //Check if input is directory
  argv.i.forEach((input, index) => {
    let checkInput; //this variable will hold stats for the input, THIS IS AN IMPORTANT STEP

    let flag = false; //This flag is to control if file is in the root folder or is a full path to somewhere else
    //flag is true if it is a path
    if (input.indexOf(":") != -1) {
      //if there is : then is a full Path
      if (fs.existsSync(input)) {
        checkInput = fs.statSync(input);
        flag = true;
      } else {
        console.error(`"${input}" does not exist`);
      }
    }

    if (!flag) {
      //if flag is false, file is in the root folder
      if (fs.existsSync("./" + input)) {
        checkInput = fs.statSync("./" + input);
      } else {
        console.error(`"${input}" does not exist`);
      }
    }

    //check if input is a directory
    //if it is, read the files inside it and write html of each
    if (checkInput && checkInput.isDirectory()) {
      let files;

      if (flag) {
        files = fs.readdirSync(input);
      } else {
        files = fs.readdirSync("./" + input);
      }
      if (files) {
        files.forEach((txtInput) => {
          htmlMaker(txtInput, argv.o, argv.s, argv.i[index], flag);
        });
      }
    }

    //check if its a file
    if (checkInput && !checkInput.isDirectory()) {
      htmlMaker(input, argv.o, argv.s, argv.i[index]); //here
    }
  });
}

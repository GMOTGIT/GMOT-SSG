/*global test, expect */
const writeFile = require("./writeFile");
// parameters: (argv_o = "dist", txtInput, content)

test("Run writeFile Function with correct parameters, to return true", () => {
  expect(
    writeFile("", "thisIsATest.txt", "This is the content for this test")
  ).toBeTruthy();
});

test("Run writeFile Function with correct parameters, to be defined", () => {
  expect(
    writeFile("", "thisIsATest.txt", "This is the content for this test")
  ).toBeDefined();
});

test("Run writeFile with custom output location", () => {
  expect(
    writeFile(".", "thisIsATest.txt", "This is the content for this test")
  ).toBeTruthy();
});

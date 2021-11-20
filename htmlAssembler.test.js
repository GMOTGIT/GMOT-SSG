/*global test, expect */
const htmlAssembler = require("./htmlAssembler");

test("Adds lines, text input, stylesheet, and language", () => {
  expect(
    htmlAssembler("line", "nameOfTheFile", "StyleSheet", "Language")
  ).toBeDefined();
});

test("Accept all empty Strings", () => {
  expect(htmlAssembler("", "", "", "")).toBeDefined();
});

test("Missing one argument still works", () => {
  expect(htmlAssembler("", "", "")).toBeDefined();
});

test("Missing 2 Arguments still works", () => {
  expect(htmlAssembler("", "")).toBeDefined();
});

test("Missing 3 Arguments still works", () => {
  expect(htmlAssembler("")).toBeDefined();
});

test("Missing all Arguments Throws", () => {
  expect(() => htmlAssembler()).toThrow();
});

test("Null Argument should throw", () => {
  expect(() => htmlAssembler(null)).toThrow();
});

test("html should contain passed lang", () => {
  let output = htmlAssembler("", "", "", "fake_lang");

  expect(output).toContain(`<html lang="fake_lang">`);
});

test("html should contain passed stylesheet URI", () => {
  let output = htmlAssembler("", "", "fake_style_sheet", "");

  expect(output).toContain(`<link rel="stylesheet" href="fake_style_sheet"></link>`);
});

test("h1 should be present", () => {
  let output = htmlAssembler("Heading 1\r\n\r\nParagraph", "test.txt", "", "");

  expect(output).toContain("<h1>Heading 1</h1>");
});

test("title should be present", () => {
  let output = htmlAssembler("Title text\r\n\r\nParagraph", "test.txt", "", "");

  expect(output).toContain("<title>Title text</title>");
});

test("paragraph should be present", () => {
  let output = htmlAssembler("Title text\r\n\r\nParagraph text", "test.txt", "", "");

  expect(output).toContain("<p>Paragraph text</p>");
});
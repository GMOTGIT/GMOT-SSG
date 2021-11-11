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

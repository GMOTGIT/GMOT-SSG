/*global test, expect */
const htmlMaker = require("./htmlMaker");

// 1-Arg - txtInput,
// 2-Arg - Output Directory
// 3-Arg - Style Sheet
// 4-Arg File Path
// 5-Arg  Language

test("Testing htmlMaker with all Arguments", () => {
  expect(htmlMaker("test.txt", "", "StyleSheet", ".", "Language")).toBeTruthy();
});

test("Testing Missing the Input file", () => {
  expect(htmlMaker("", "", "StyleSheet", ".", "Language")).not.toBeTruthy();
});

test("Testing htmlMaker with just the input file", () => {
  expect(htmlMaker("test.txt")).toBeTruthy();
});

test("Testing htmlMaker with no arguments", () => {
  expect(() => htmlMaker()).toThrow();
});

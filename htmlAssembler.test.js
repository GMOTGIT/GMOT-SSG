const htmlAssembler = require("./htmlAssembler");

test("Adds lines, text input, stylesheet, and laguange", () => {
  expect(
    htmlAssembler("line", "nameOfTheFile", "StyleSheet", "Language")
  ).toBeDefined();
});

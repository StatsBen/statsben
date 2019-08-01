/* eslint-disable */

import { validator } from "../../utils/validator";
import { globals } from "../../globals";
import { validEntry as e } from "../demo-entries/demo-valid-entry";
import { totallyInvalidEntry as i } from "../demo-entries/demo-fucked-up-entry";

globals.entryDefinition.attributes.forEach(attr => {
  let testName = `Correctly validates a valid entry for attribute: "${
    attr.name
  }"`;

  test(testName, () => {
    expect(validator.validateEntryAttrByName(e, attr.name)).toBe(true);
  });
});

test("Correctly validates entire valid entry", () => {
  expect(validator.validateEntireEntry(e)).toBe(true);
});

test("Throws correct error for non-existent attribute", () => {
  expect(validator.validateEntryAttrByName(e, "fakeName")).toThrow(
    /invalid attribute argument/
  );
});

test("Throws correct error for entry with erroneous attribute", () => {
  expect(validator.validateEntireEntry(i)).toThrow(/attribute doesnt exist/);
});

test("Throws correct error for entry attribute of wrong type", () => {
  expect(validator.validateEntryAttrByName(i, "name")).toThrow(
    /wrong attribute type/
  );
});

test("Throws correct error for invalid date", () => {
  expect(validator.validateEntryAttrByName(i, "dateUTC")).toThrow(
    /invalid date/
  );
});

test("Throws correct error for missing attribute", () => {
  expect(validator.validateEntryAttrByName(i, "dateString")).toThrow(
    /missing attribute/
  );
});

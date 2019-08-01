import { validator } from "../../utils/validator";
import { globals } from "../../globals";
import { validEntry as e } from "../demo-entries/demo-valid-entry";
import { totallyInvalidEntry as i } from "../demo-entries/demo-fucked-up-entry";

globals.entryDefinition.attributes.forEach(attr => {
  let testName = `correctly validates a valid entry for attribute: "${
    attr.name
  }"`;

  test(testName, () => {
    expect(validator.validateEntryAttributeByName(e, attr.name)).toBe(true);
  });
});

test("correctly validates entire valid entry", () => {
  expect(validator.validateEntireEntry(e)).toBe(true);
});

test("throws correct error for non-existent attribute", () => {
  expect(validator.validateEntryAttributeByName(e, "fakeName")).toThrow(
    /provided attribute name doesnt exist/
  );
});

test("throws correct error for entry with erroneos attribute", () => {
  expect(validator.validateEntireEntry(i)).toThrow(
    /contains an attribute that doesnt exist in the entry definition/
  );
});

test("throws correct error for entry attribute of wrong type", () => {
  expect(validator.validateEntryAttributeByName(i, "name")).toThrow(
    /wrong type/
  );
});

test("throws correct error for invalid date", () => {
  expect(validator.validateEntryAttributeByName(i, "dateUTC")).toThrow(
    /invalid date/
  );
});

test("throws correct error for missing attribute", () => {
  expect(validator.validateEntryAttributeByName(i, "dateString")).toThrow(
    /attribute was missing/
  );
});

// test("correctly validates ");

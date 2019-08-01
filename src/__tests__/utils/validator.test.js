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

let grades = globals.entryDefinition.attributes.find(attr => {
  return attr.name === "grade";
});

grades.objectFields.map(grade => {
  test(`Throws error for invalid grade of type: "${grade.name}"`, () => {
    switch (grade.unit) {
      case "commitment":
        expect(validator.validateCommitmentGrade("pickle")).toThrow();
      case "distance":
        expect(validator.validateDistance("pickle")).toThrow();
      case "ice":
        expect(validator.validateIceGrade("pickle")).toThrow();
      case "rock":
        expect(validator.validateYDSGrade("pickle")).toThrow();
      case "scramble":
        expect(validator.validateScramblingGrade("pickle")).toThrow();
      case "vert":
        expect(validator.validateVert("pickle")).toThrow();
      default:
        fail();
    }
  });
});

test("Test YDS Grade Validator", () => {
  expect(validator.validateYDSGrade("4")).toThrow();
  expect(validator.validateYDSGrade("3.10c")).toThrow();
  expect(validator.validateYDSGrade("5.10e")).toThrow();
  expect(validator.validateYDSGrade("5.9b")).toThrow();
  expect(validator.validateYDSGrade("5.16")).toThrow();
  expect(validator.validateYDSGrade("5.122")).toThrow();
  expect(validator.validateYDSGrade(5.12)).toThrow();
  expect(validator.validateYDSGrade("5.2")).toEqual(true);
  expect(validator.validateYDSGrade("5.9")).toEqual(true);
  expect(validator.validateYDSGrade("5.9+")).toEqual(true);
  expect(validator.validateYDSGrade("5.7-")).toEqual(true);
  expect(validator.validateYDSGrade("5.10c")).toEqual(true);
  expect(validator.validateYDSGrade("5.12d")).toEqual(true);
  expect(validator.validateYDSGrade("5.15a")).toEqual(true);
});

test("Test Ice Grade Validator", () => {
  expect(validator.validateIceGrade("X")).toThrow();
  expect(validator.validateIceGrade("WI8")).toThrow();
  expect(validator.validateIceGrade("I8")).toThrow();
  expect(validator.validateIceGrade("8")).toThrow();
  expect(validator.validateIceGrade("3")).toThrow();
  expect(validator.validateIceGrade("WI0")).toThrow();
  expect(validator.validateIceGrade("AI")).toThrow();
  expect(validator.validateIceGrade("WI3")).toEqual(true);
  expect(validator.validateIceGrade("WI5")).toEqual(true);
  expect(validator.validateIceGrade("WI3+")).toEqual(true);
  expect(validator.validateIceGrade("WI3")).toEqual(true);
  expect(validator.validateIceGrade("AI3")).toEqual(true);
  expect(validator.validateIceGrade("AI5+")).toEqual(true);
});

test("Test Commitment Grade Validator", () => {
  expect(validator.validateCommitmentGrade("2")).toThrow();
  expect(validator.validateCommitmentGrade(0)).toThrow();
  expect(validator.validateCommitmentGrade(8)).toThrow();
  expect(validator.validateCommitmentGrade(4)).toEqual(true);
});

test("Test Distance Validator", () => {
  expect(validator.validateDistance("300")).toThrow();
  expect(validator.validateDistance(0)).toThrow();
  expect(validator.validateDistance(50)).toEqual(true);
});

test("Test Scrambling Grade Validator", () => {
  expect(validator.validateScramblingGrade("3")).toThrow();
  expect(validator.validateScramblingGrade(0)).toThrow();
  expect(validator.validateScramblingGrade(5)).toThrow();
  expect(validator.validateScramblingGrade(3)).toEqual(true);
});

test("Test Vert Validator", () => {
  expect(validator.validateVert("50000")).toThrow();
  expect(validator.validateVert(0)).toThrow();
  expect(validator.validateVert(12000)).toEqual(true);
});

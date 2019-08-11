/* eslint-disable */

import { validator } from "../../utils/validator";
import { globals } from "../../globals";
import { validEntry as e } from "../demo-entries/demo-valid-entry";
import { totallyInvalidEntry as i } from "../demo-entries/demo-fucked-up-entry";

test("Correctly validates entire valid entry", () => {
  expect(validator.validateEntireEntry(e)).toBe(true);
});

test("Test Validate Entry Attribute By Name", () => {
  expect(() => {
    validator.validateEntryAttrByName(e, "fakeName");
  }).toThrow();
});

test("Returns false for invalid whole entry", () => {
  expect(validator.validateEntireEntry(i)).toEqual(false);
});

let grades = globals.entryDefinition.attributes.find(attr => {
  return attr.name === "grade";
});

test("Test YDS Grade Validator", () => {
  expect(validator.validateYDSGrade("4")).toEqual(false);
  expect(validator.validateYDSGrade("3.10c")).toEqual(false);
  expect(validator.validateYDSGrade("5.10e")).toEqual(false);
  expect(validator.validateYDSGrade("5.9b")).toEqual(false);
  expect(validator.validateYDSGrade("5.16")).toEqual(false);
  expect(validator.validateYDSGrade("5.122")).toEqual(false);
  expect(validator.validateYDSGrade(5.12)).toEqual(true);
  expect(validator.validateYDSGrade("5.2")).toEqual(true);
  expect(validator.validateYDSGrade("5.9")).toEqual(true);
  expect(validator.validateYDSGrade("5.9+")).toEqual(true);
  expect(validator.validateYDSGrade("5.7-")).toEqual(true);
  expect(validator.validateYDSGrade("5.10c")).toEqual(true);
  expect(validator.validateYDSGrade("5.12d")).toEqual(true);
  expect(validator.validateYDSGrade("5.15a")).toEqual(true);
  expect(validator.validateYDSGrade(null)).toEqual(true);
  expect(validator.validateYDSGrade("")).toEqual(true);
});

test("Test Ice Grade Validator", () => {
  expect(validator.validateIceGrade("X")).toEqual(false);
  expect(validator.validateIceGrade("WI8")).toEqual(false);
  expect(validator.validateIceGrade("I8")).toEqual(false);
  expect(validator.validateIceGrade("8")).toEqual(false);
  expect(validator.validateIceGrade("3")).toEqual(false);
  expect(validator.validateIceGrade("WI0")).toEqual(false);
  expect(validator.validateIceGrade("AI")).toEqual(false);
  expect(validator.validateIceGrade("WI3")).toEqual(true);
  expect(validator.validateIceGrade("WI5")).toEqual(true);
  expect(validator.validateIceGrade("WI3+")).toEqual(true);
  expect(validator.validateIceGrade("WI3")).toEqual(true);
  expect(validator.validateIceGrade("AI3")).toEqual(true);
  expect(validator.validateIceGrade("AI5+")).toEqual(true);
  expect(validator.validateIceGrade(null)).toEqual(true);
  expect(validator.validateIceGrade("")).toEqual(true);
});

test("Test Commitment Grade Validator", () => {
  expect(validator.validateCommitmentGrade("Grade III")).toEqual(true);
  expect(validator.validateCommitmentGrade(4)).toEqual(true);
  expect(validator.validateCommitmentGrade(0)).toEqual(false);
  expect(validator.validateCommitmentGrade(8)).toEqual(false);
  expect(validator.validateCommitmentGrade(4)).toEqual(true);
  expect(validator.validateCommitmentGrade(null)).toEqual(true);
  expect(validator.validateCommitmentGrade("")).toEqual(true);
});

test("Test Distance Validator", () => {
  expect(validator.validateDistance("300km")).toEqual(true);
  expect(validator.validateDistance(0)).toEqual(false);
  expect(validator.validateDistance(50)).toEqual(true);
  expect(validator.validateDistance(null)).toEqual(true);
  expect(validator.validateDistance("")).toEqual(true);
});

test("Test Scrambling Grade Validator", () => {
  expect(validator.validateScramblingGrade("3")).toEqual(true);
  expect(validator.validateScramblingGrade(0)).toEqual(false);
  expect(validator.validateScramblingGrade("6")).toEqual(false);
  expect(validator.validateScramblingGrade(5)).toEqual(true);
  expect(validator.validateScramblingGrade(3)).toEqual(true);
  expect(validator.validateScramblingGrade(null)).toEqual(true);
  expect(validator.validateScramblingGrade("")).toEqual(true);
});

test("Test Vert Validator", () => {
  expect(validator.validateVert(0)).toEqual(false);
  expect(validator.validateVert(12000)).toEqual(true);
  expect(validator.validateVert(null)).toEqual(true);
  expect(validator.validateVert("")).toEqual(true);
});

test("Test Boolean Validator", () => {
  expect(validator.validateBoolean(true)).toEqual(true);
  expect(validator.validateBoolean("true")).toEqual(false);
});

test("Test Date Validator", () => {
  expect(validator.validateDate("12/3/94")).toEqual(true);
  expect(validator.validateDate("01/03/18")).toEqual(true);
  expect(validator.validateDate("12-3-94")).toEqual(true);
  expect(validator.validateDate("true")).toEqual(false);
  expect(validator.validateDate(null)).toEqual(false);
  expect(validator.validateDate("")).toEqual(false);
});

test("Test Number Validator", () => {
  expect(validator.validateNumber(12)).toEqual(true);
  expect(validator.validateNumber("12")).toEqual(false);
  expect(validator.validateNumber(null)).toEqual(true);
});

test("Test String Validator", () => {
  expect(validator.validateString("Poo")).toEqual(true);
  expect(validator.validateString(true)).toEqual(false);
  expect(validator.validateString(12)).toEqual(false);
  expect(validator.validateString(null)).toEqual(true);
  expect(validator.validateString("")).toEqual(true);
});

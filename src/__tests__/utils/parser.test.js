/* eslint-disable */
import { parser } from "../../utils/parser";
import { validEntry } from "../demo-entries/demo-valid-entry";
import { fuckedUpEntry } from "../demo-entries/demo-fucked-up-entry";

test("Test Parse Alpine Grade", () => {
  expect(parser.parseAlpineGrade("D")).toEqual("D");
  expect(parser.parseAlpineGrade("PD+")).toEqual("PD+");
  expect(parser.parseAlpineGrade("F")).toEqual("F");
  expect(() => {
    parser.parseAlpineGrade("poo");
  }).toThrow();
  expect(() => {
    parser.parseAlpineGrade(12);
  }).toThrow();
});

test("Test Parse Date", () => {
  const testDate = new Date("1/31/94");
  const testDate2 = new Date("");
  const testDate3 = new Date(null);
  expect(parser.parseDate("1/31/94")).toEqual(testDate.toString());
  expect(parser.parseDate("01/31/1994")).toEqual(testDate.toString());
  expect(parser.parseDate("01/31/94")).toEqual(testDate.toString());
  expect(parser.parseDate(testDate)).toEqual(testDate.toString());
  expect(parser.parseDate(testDate.valueOf())).toEqual(testDate.toString());
  expect(parser.parseDate(testDate2)).toEqual(testDate2.toString());
  expect(parser.parseDate(testDate3)).toEqual(testDate3.toString());
  expect(() => {
    parser.parseDate("poo");
  }).toThrow();
  expect(() => {
    parser.parseDate("02/32/94");
  }).toThrow();
});

test("Test Parse Commitment Grade", () => {
  expect(parser.parseCommitmentGrade("II")).toEqual(2);
  expect(parser.parseCommitmentGrade("grade II")).toEqual(2);
  expect(parser.parseCommitmentGrade(2)).toEqual(2);
  expect(parser.parseCommitmentGrade("IV")).toEqual(4);
  expect(parser.parseCommitmentGrade("V")).toEqual(5);
  expect(parser.parseCommitmentGrade("VI")).toEqual(6);
  expect(() => {
    parser.parseCommitmentGrade("VII");
  }).toThrow();
  expect(() => {
    parser.parseCommitmentGrade("IIVII");
  }).toThrow();
  expect(() => {
    parser.parseCommitmentGrade("poo");
  }).toThrow();
  expect(() => {
    parser.parseCommitmentGrade(0);
  }).toThrow();
  expect(() => {
    parser.parseCommitmentGrade(8);
  }).toThrow();
});

test("Test Parse Distance", () => {
  expect(parser.parseDistance(12)).toEqual(12);
  expect(parser.parseDistance("  12km ")).toEqual(12);
  expect(parser.parseDistance("100mi")).toEqual(161);
  expect(() => {
    parser.parseDistance(0);
  }).toThrow();
  expect(() => {
    parser.parseDistance("100");
  }).toThrow();
  expect(() => {
    parser.parseDistance("0");
  }).toThrow();
  expect(() => {
    parser.parseDistance("poo");
  }).toThrow();
  expect(() => {
    parser.parseDistance("100fuckyous");
  }).toThrow();
});

test("Test Parse Ice Grade", () => {
  expect(parser.parseIceGrade("WI3")).toEqual("WI3");
  expect(parser.parseIceGrade("AI4  ")).toEqual("AI4");
  expect(() => {
    parser.parseIceGrade("WI9");
  }).toThrow();
  expect(() => {
    parser.parseIceGrade("fuckyou");
  }).toThrow();
  expect(() => {
    parser.parseIceGrade("AI0");
  }).toThrow();
});

test("Test Parse YDS", () => {
  expect(parser.parseYDS("5.4")).toEqual("5.4");
  expect(parser.parseYDS("5.9+")).toEqual("5.9+");
  expect(parser.parseYDS("5.2")).toEqual("5.2");
  expect(parser.parseYDS("  5.10c")).toEqual("5.10c");
  expect(() => {
    parser.parseYDS("5.11e");
  }).toThrow();
  expect(() => {
    parser.parseYDS("11b");
  }).toThrow();
  expect(() => {
    parser.parseYDS(9);
  }).toThrow();
  expect(() => {
    parser.parseYDS(5.4);
  }).toThrow();
  expect(() => {
    parser.parseYDS("5.9b");
  }).toThrow();
  expect(() => {
    parser.parseYDS("5.16");
  }).toThrow();
});

test("Test Parse Scrambling Grade", () => {
  expect(parser.parseScramblingGrade(3)).toEqual(3);
  expect(parser.parseScramblingGrade("3")).toEqual(3);
  expect(parser.parseScramblingGrade("class 3")).toEqual(3);
  expect(() => {
    parser.parseScramblingGrade(6);
  }).toThrow();
  expect(() => {
    parser.parseScramblingGrade(0);
  }).toThrow();
  expect(() => {
    parser.parseScramblingGrade("0");
  }).toThrow();
  expect(() => {
    parser.parseScramblingGrade("poopz");
  }).toThrow();
  expect(() => {
    parser.parseScramblingGrade("t 123");
  }).toThrow();
});

test("Test Parse Vert", () => {
  expect(parser.parseVert(50)).toEqual(50);
  expect(parser.parseVert("50")).toEqual(50);
  expect(parser.parseVert("50m")).toEqual(50);
  expect(parser.parseVert("1300")).toEqual(1300);
  expect(parser.parseVert("1,300")).toEqual(1300);
  expect(parser.parseVert("1,300m")).toEqual(1300);
  expect(() => {
    parser.parseVert("1,,300m");
  }).toThrow();
  expect(() => {
    parser.parseVert("50mi");
  }).toThrow();
  expect(() => {
    parser.parseVert(0);
  }).toThrow();
  expect(() => {
    parser.parseVert("poopin yr face");
  }).toThrow();
});

test("Test Parse Entire Entry", () => {
  expect(parser.parseEntireEntry(validEntry)).toEqual(validEntry);
  expect(() => {
    parser.parseEntireEntry(fuckedUpEntry);
  }).toThrow();
});

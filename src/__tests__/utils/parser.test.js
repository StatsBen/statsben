/* eslint-disable */
import { parser } from "../../utils/parser";

test("Test Parse Date", () => {
  const testDate = new Date("1/31/94");
  expect(parser.parseDate("1/31/94")).toEqual(testDate);
  expect(parser.parseDate("1/31/1994")).toEqual(testDate);
  expect(parser.parseDate("01/31/94")).toEqual(testDate);
  expect(parser.parseDate("January 31st, 1994")).toEqual(testDate);
  expect(parser.parseDate(testDate)).toEqual(testDate);
  expect(parser.parseDate(testDate.valueOf())).toEqual(testDate);
  expect(() => {
    parser.parseDate("poo");
  }).toThrow();
  expect(() => {
    parser.parseDate("02/31/94");
  }).toThrow();
});

test("Test Parse Commitment Grade", () => {
  expect(parser.parseCommitmentGrade("II")).toEqual(2);
  expect(parser.parseCommitmentGrade(2)).toEqual(2);
  expect(parser.parseCommitmentGrade("IV")).toEqual(4);
  expect(parser.parseCommitmentGrade("VI")).toEqual(6);
  expect(() => {
    parser.parseCommitmentGrade("VII");
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
  expect(parser.parseDistance("12k")).toEqual(12);
  expect(parser.parseDistance("  12km ")).toEqual(12);
  expect(parser.parseDistance("1,000")).toEqual(1000);
  expect(parser.parseDistance("1,300km")).toEqual(1300);
  expect(parser.parseDistance("100mi")).toEqual(170);
  expect(() => {
    parser.parseDistance(0);
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
  expect(parser.parseYDSGrade("5.4")).toEqual("5.4");
  expect(parser.parseYDSGrade("5.9+")).toEqual("5.9+");
  expect(parser.parseYDSGrade("  5.10c  ")).toEqual("5.10c");
  expect(() => {
    parser.parseYDSGrade("5.11e");
  }).toThrow();
  expect(() => {
    parser.parseYDSGrade("11b");
  }).toThrow();
  expect(() => {
    parser.parseYDSGrade(9);
  }).toThrow();
  expect(() => {
    parser.parseYDSGrade(5.4);
  }).toThrow();
  expect(() => {
    parser.parseYDSGrade("5.9b");
  }).toThrow();
  expect(() => {
    parser.parseYDSGrade("5.16");
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
});

test("Test Parse Vert", () => {
  expect(parser.parseVert(50)).toEqual(50);
  expect(parser.parseVert("50")).toEqual(50);
  expect(parser.parseVert("50m")).toEqual(50);
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

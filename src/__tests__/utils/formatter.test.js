/* eslint-disable */
import { formatter } from "../../utils/formatter";

test("Test Pretty Date", () => {
  let testDate = new Date("1/2/03");
  expect(formatter.prettyDate(testDate)).toEqual("01 - 02 - 03");
  expect(() => {
    formatter.prettyDate(12);
  }).toThrow();
  expect(() => {
    formatter.prettyDate("stringyboi");
  }).toThrow();
});

test("Test Pretty Scrambling Grade", () => {
  expect(formatter.prettyScramblingGrade(3)).toEqual("class 3");
  expect(() => {
    formatter.prettyScramblingGrade("6");
  }).toThrow();
  expect(() => {
    formatter.prettyScramblingGrade(0);
  }).toThrow();
});

test("Pretty Commitment Grade", () => {
  expect(formatter.prettyCommitmentGrade(2)).toEqual("grade II");
  expect(formatter.prettyCommitmentGrade(4)).toEqual("grade IV");
  expect(formatter.prettyCommitmentGrade(6)).toEqual("grade VI");
  expect(() => {
    formatter.prettyCommitmentGrade("VI");
  }).toThrow();
  expect(() => {
    formatter.prettyCOmmitmentGrade(0);
  }).toThrow();
});

test("Test Pretty Distance", () => {
  expect(formatter.prettyDistance(50)).toEqual("50km");
  expect(() => {
    formatter.prettyDistance("50k");
  }).toThrow();
  expect(() => {
    formatter.prettyDistance(0);
  }).toThrow();
});

test("Test Pretty Vert", () => {
  expect(formatter.prettyVert(50)).toEqual("50m");
  expect(formatter.prettyVert(1300)).toEqual("1,300m");
  expect(() => {
    formatter.prettyVert("poo");
  }).toThrow();
  expect(() => {
    formatter.prettyVert(0);
  }).toThrow();
});

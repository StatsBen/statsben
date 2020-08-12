import React from "react";
import styled from "styled-components";
import { colours } from "./globals/colours";
import { fonts } from "./globals/fonts";
import { sizes } from "./globals/sizes";
import { addCaptionToImgFromAltText } from "./utils/image-caption-script";
import { formatter } from "./utils/formatter";

// const demoProps = {
//   entry: {
//     date: "{nanoseconds: 0, seconds: 1593068400}",
//     html:
//       "<div><span>I had the pleasure of following Alex Geary up Vertical Poetry on Victor Lake Wall. That's a really fun route, and the exposure on pitch 5/6 is pretty thrilling!</span>\n<img class='large' alt='A photo of myself on top of pitch 5 (photo by Alex Geary)' src='https://firebasestorage.googleapis.com/v0/b/adventures-41a04.appspot.com/o/images%2FIMG_6063.jpg?alt=media&token=2f0487c0-0ac9-4f92-92de-2fa566dd0200' />",
//     types: "{alpine: false, certifications: false, hiking: fals…}",
//     range: "Monashees",
//     longForm: null,
//     grade: "{alpine: null, commitment: null, distance: null, ic…}",
//     name: "Victor Lake Wall"
//   }
// };

export const EntriesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
`;

export const EntryContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  max-width: 800px;
  margin: 80px auto;
  padding: 0 5% 100px 5%;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }
`;

const EntryDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  font-family: ${fonts.accent};
  max-height: 10em;
  text-align: right;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    font-size: 0.8em;
    padding: 0.5em 0;
    text-align: left;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) {
    font-size: 1.2em;
    direction: ltr;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: rotate(180deg);
    padding: 0 1em;
  }
`;

const EntryContentContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  border-left: thin solid ${colours.lightGray};
  padding: 0 1em;
`;

const EntryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${sizes.tabletBreakpoint}) {
    flex-direction: row;
  }
`;

const EntryTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  font-size: 2em;
  font-weight: 900;
  color: black;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    line-height: 0.8em;
    font-size: 2em;
    padding: 0.3em 0;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) and (max-width: ${sizes.tabletBreakpoint}) {
    font-size: 2.5em;
  }

  @media (min-width: ${sizes.tabletBreakpoint}) {
    font-size: 3em;
  }
`;

const EntryDetails = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) and (max-width: ${sizes.tabletBreakpoint}) {
    flex-direction: row;
  }

  @media (min-width: ${sizes.tabletBreakpoint}) {
    flex-direction: column;
  }

  div {
    @media (max-width: ${sizes.mobileBreakpoint}) {
      text-align: left;
    }

    @media (min-width: ${sizes.mobileBreakpoint}) and (max-width: ${sizes.tabletBreakpoint}) {
      text-align: left;
      padding-right: 2em;
    }

    @media (min-width: ${sizes.tabletBreakpoint}) {
      width: 100%;
      text-align: right;
    }
  }

  div:first-child {
    @media (min-width: ${sizes.tabletBreakpoint}) {
      padding-top: 0.5em;
    }
  }

  div:nth-child(2) {
    @media (max-width: ${sizes.mobileBreakpoint}) {
      text-align: left;
    }
  }
`;

const EntryContents = styled.div`
  width: 100%;
  border-top: thin solid ${colours.lighterGray};
  padding-top: 40px;
  margin-top: 20px;
  @media (max-width: ${sizes.mobileBreakpoint}) {
    padding-top: 20px;
  }
`;

export class Entry extends React.Component {

  componentDidMount() {
    addCaptionToImgFromAltText(this.element);
  }

  render() {
    const {entry} = this.props;
    const dateStr = buildDateString(entry);
    const gradeStr = buildGradeString(entry.grade);

    return (
      <EntryContainer ref={r => (this.element = r)}>
        <EntryDate>{dateStr}</EntryDate>
        <EntryContentContainer>
          <EntryHeaderContainer>
            <EntryTitle>{entry.name}</EntryTitle>
            <EntryDetails>
              <div>{gradeStr}</div>
              <div>{entry.range}</div>
            </EntryDetails>
          </EntryHeaderContainer>
          <EntryContents
            dangerouslySetInnerHTML={{ __html: entry.html }}
          ></EntryContents>
        </EntryContentContainer>
      </EntryContainer>
    );
  }
}

const buildDateString = entry => {
  const date = new Date(entry.date.toDate());
  const rawDay = date.getDay();
  const day = rawDay < 10 ? "0" + rawDay : rawDay;
  const rawMonth = date.getMonth();
  const month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
  const dateStr = day + "-" + month + "-" + date.getFullYear();
  return dateStr;
};

const buildGradeString = gradeObject => {
  let gradeString = "(";
  let gradeHasContents = false;

  for (var grade in gradeObject) {
    if (gradeObject.hasOwnProperty(grade)) {
      let value = gradeObject[grade];
      if (value) {
        gradeString += formatter.prettyByGradeName(value, grade) + ", ";
        gradeHasContents = true;
      }
    }
  }

  // Remove surrepttitiously added final comma
  gradeString = gradeString.substring(0, gradeString.length - 2);

  gradeString += ")";
  return gradeHasContents ? gradeString : "";
};

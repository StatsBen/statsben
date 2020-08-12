import React from "react";
import styled from "styled-components";
import { colours } from "./globals/colours";
import { fonts } from "./globals/fonts";
import { sizes } from "./globals/sizes";
// import { addCaptionToImgFromAltText } from "./utils/image-caption-script";

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
  padding: 0 5%;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }
`;

const EntryDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  font-family: ${fonts.accent};

  @media (max-width: ${sizes.mobileBreakpoint}) {
    font-size: 0.8em;
    padding: 0.5em 0;
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
`;

const EntryTitle = styled.div`
  font-size: 2em;
  font-weight: 900;
  color: black;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    font-size: 2em;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) and (max-size: ${sizes.tabletBreakpoint}) {
    font-size: 2.5em;
  }

  @media (min-width: ${sizes.tabletBreakpoint}) {
    font-size: 3em;
  }
`;

export const Entry = ({ entry }) => {
  const dateStr = buildDateString(entry);

  return (
    <EntryContainer>
      <EntryDate>{dateStr}</EntryDate>
      <EntryContentContainer>
        <EntryHeaderContainer>
          <EntryTitle>{entry.name}</EntryTitle>
        </EntryHeaderContainer>
      </EntryContentContainer>
    </EntryContainer>
  );
};

const buildDateString = entry => {
  const date = new Date(entry.date.toDate());
  const rawDay = date.getDay();
  const day = rawDay < 10 ? "0" + rawDay : rawDay;
  const rawMonth = date.getMonth();
  const month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
  const dateStr = day + "-" + month + "-" + date.getFullYear();
  return dateStr;
};

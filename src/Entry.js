import React from "react";
import styled from "styled-components";
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

// const EntryOuterContainer = styled.div`
//   max-width: 800px;
//   width: 90%;
//   height: 500px; /* STUB */
//   margin: 80px 5% 0 5%;
//   background: orange;
// `;

export const EntriesContainer = styled.div`
  width: 100%;
  background: orange;
  display: flex;
  align-items: center;
  align-content: center;
`;

export const EntryContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  max-width: 800px;
  margin: 80px auto;
  padding: 0 50px;
  background: red;
`;

export const Entry = ({ entry }) => {
  return <EntryContainer>{entry.name}</EntryContainer>;
};

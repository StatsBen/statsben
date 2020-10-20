import styled from "styled-components";
import { colours } from "../../globals/colours";
import { fonts } from "../../globals/fonts";
import { sizes } from "../../globals/sizes";

export const EntryContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) {
    padding: 0 50px;
  }
`;

// export const EntryDate = styled.div`
//   flex-grow: 0;
//   flex-shrink: 0;
//   flex-basis: auto;
//   font-family: ${fonts.accent};
//   max-height: 10em;
//   text-align: right;

//   @media (max-width: ${sizes.mobileBreakpoint}) {
//     display: none; /* hide in the mobile view - it's redundant */
//     /* font-size: 0.8em;
//     padding: 0.5em 0;
//     text-align: left; */
//   }

//   @media (min-width: ${sizes.mobileBreakpoint}) {
//     font-size: 1.2em;
//     direction: ltr;
//     writing-mode: vertical-rl;
//     text-orientation: sideways;
//     transform: rotate(180deg);
//     padding: 0 1em;
//   }
// `;

export const EntryContentContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  /* border-left: thin solid ${colours.lightGray}; */
  /* padding: 0 1em; */
`;

export const EntryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* @media (min-width: ${sizes.tabletBreakpoint}) {
    flex-direction: row;
  } */
`;

export const EntryTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  font-size: 2em;
  font-weight: 900;
  color: black;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    display: none; /* hide in the mobile view - it's redundant */
    /* line-height: 0.8em;
    font-size: 2em;
    padding: 0.3em 0; */
  }

  @media (min-width: ${sizes.mobileBreakpoint}) and (max-width: ${sizes.tabletBreakpoint}) {
    font-size: 2.5em;
  }

  @media (min-width: ${sizes.tabletBreakpoint}) {
    font-size: 3em;
  }
`;

export const EntryDetails = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;

  div {
    font-style: italic;
    @media (max-width: ${sizes.mobileBreakpoint}) {
      font-family: ${fonts.accent};
      color: ${colours.charcoal};
    }
  }

  div:first-child {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    padding-right: 0.5em;
    /* background: orange; */
    @media (min-width: ${sizes.mobileBreakpoint}) {
      &:after {
        content: ",";
      }
    }
  }

  div:nth-child(2) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    /* background: green; */
    @media (max-width: ${sizes.mobileBreakpoint}) {
      text-align: right;
    }
  }
`;

export const EntryContents = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 1.1em;
  color: ${colours.charcoal};
  text-align: justify;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    border-top: none;
    margin-top: 0;
  }
`;

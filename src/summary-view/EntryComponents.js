import styled from "styled-components";
import { colours } from "../globals/colours";
import { fonts } from "../globals/fonts";
import { sizes } from "../globals/sizes";

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
  margin: 0 auto;
  padding: 0 5% 0 5%;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const EntryDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  font-family: ${fonts.accent};
  max-height: 10em;
  text-align: right;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    display: none; /* hide in the mobile view - it's redundant */
    /* font-size: 0.8em;
    padding: 0.5em 0;
    text-align: left; */
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

  @media (min-width: ${sizes.tabletBreakpoint}) {
    flex-direction: row;
  }
`;

export const EntryTitle = styled.div`
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

export const EntryDetails = styled.div`
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

export const EntryContents = styled.div`
  width: 100%;
  border-top: thin solid ${colours.lighterGray};
  padding-top: 40px;
  margin-top: 20px;
  @media (max-width: ${sizes.mobileBreakpoint}) {
    padding-top: 20px;
  }
`;

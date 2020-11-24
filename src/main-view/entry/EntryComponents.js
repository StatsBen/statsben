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
    padding: 20px 0;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) {
    padding: 50px 50px;
    margin: 0 50px 100px 50px;
    box-shadow: 1px 1px 15px #eeeeee;
    border: thin solid #ececec;
    border-radius: 10px;
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
`;

export const EntryTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  font-size: 2em;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: black;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    display: none; /* hide in the mobile view - it's redundant */
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
    /* background: orange; */
    @media (min-width: ${sizes.mobileBreakpoint}) {
    padding-right: 0.5em;
      &:after {
        content: ",";
      }
    }
  }

  div:nth-child(2) {
    @media (min-width: ${sizes.mobileBreakpoint}) {
      display: none;
    }
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    height: 0.6em;
    margin: 0 0.5em;
    border-bottom: thin solid ${colours.lightGray};
  }

  div:nth-child(3) {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    padding-right: 0.25em; /* Stops the italicized parenthesis from being clipped */
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
    margin-top: 1em;
  }
`;

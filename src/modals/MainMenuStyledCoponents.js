import styled from "styled-components";
import { colours } from "../globals/colours";
import { fonts } from "../globals/fonts";
import { sizes } from "../globals/sizes";

export const MenuSection = styled.div`
  width: 90%;
  margin: 0 5%;
  padding: 0.5em 0;
  font-family: ${fonts.accent};
  font-size: 1.2em;
  border-bottom: thin solid ${colours.lighterGray};

  @media (max-width: ${sizes.mobileBreakpoint}) {
    line-height: 1.5em;
  }
`;

export const MenuSectionHeader = styled.div`
  position: relative;
  float: left;
  margin: 0.5em 5%;
  color: ${colours.darkGray};
  font-weight: 900;
`;

export const MenuLink = styled.a`
  display: block;
  position: relative;
  float: left;
  margin: 0.5em 5%;
  color: ${colours.charcoal};
  font-weight: 400;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: ${colours.accentBlue};
  }

  @media (max-width: ${sizes.tabletBreakpoint}) {
    float: none;
    clear: both;
    font-size: 0.8em;
  }
`;

export const FilterByLink = styled(MenuLink)`
  float: none;
  clear: both;
  margin-left: 10%;
  text-decoration: none;
  &.active {
    color: ${colours.accentBlue};
    text-decoration: underline;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 5%;
  padding: 60px 0;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const FooterDisclaimer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export const FooterVersionNo = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding-left: 5%;
  border-left: thin solid ${colours.lighterGray};
  text-align: right;

  @media (max-width: ${sizes.mobileBreakpoint}) {
    padding-top: 10px;
    padding-left: 0;
    border-left: none;
    text-align: left;
  }
`;

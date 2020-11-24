import styled from "styled-components";
import { globals } from "../globals";
import { fullWidthMobile } from "./FullWidthMobileDiv";

export const ControlsContainer = styled.div`
  ${fullWidthMobile};
  margin-bottom: 100px;
  border-top: thin solid ${globals.colours.lighterGray};
  border-bottom: thin solid ${globals.colours.lighterGray};
`;

export const ControlInputContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 2.5em;
  &:first-child {
    padding-top: 2.5em;
  }
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const ControlLabel = styled.span`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 0.5em  0;
`;

export const ControlInput = styled.span`
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

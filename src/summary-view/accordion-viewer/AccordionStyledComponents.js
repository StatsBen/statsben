import styled from "styled-components";
import { globals } from "../../globals";

export const AccordionViewerContainer = styled.div`
  width: calc(100% - 100px);
  margin: 0 50px;
  @media (min-width: ${globals.sizes.mobileBreakpoint}) {
    display: none;
  }
`;

export const CollapsedEntryContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  padding: 15px;
  font-family: ${globals.fonts.accent};
  border-bottom: thin solid ${globals.colours.lighterGray};
  user-select: none;
  &:hover {
    cursor: pointer;
    background: ${globals.colours.lighterGray};
  }
  &:active {
    background: ${globals.colours.mediumGray};
    color: ${globals.colours.white};
  }
`;

export const CollapsedEntryDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 113px;
  width: 113px;
  padding: 0;
  vertical-align: middle;
  span {
    height: 100%;
  }
`;

export const CollapsedEntryTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  padding: 0 0 0 12px;
  border-left: thin solid ${globals.colours.lighterGray};
`;

export const CollapsedChevron = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 0 0 0 12px;
  vertical-align: middle;
  svg {
    width: 1em;
    height: 100%;
  }
`;

export const ExpandedEntryContainer = styled.div`
  width: 100%;
  border-bottom: thin solid ${globals.colours.lighterGray};
  overflow: hidden;
`;

export const CloseButtContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

export const CloseButton = styled.span`
  width: 100%;
  color: black;
  font-family: ${globals.fonts.accent};
  text-align: center;
  text-decoration: underline;
`;

export const CloseIcon = styled.div`
  float: right;
  top: 0;
  right: 0;
  width: 2em;
`;

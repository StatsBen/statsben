import styled from "styled-components";
import { globals } from "../../globals";

export const EntryViewerContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    display: none;
  }
`;

export const ActiveEntry = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export const NavContainer = styled.div`
  position: sticky;
  top: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => props.maxWidth};
  height: ${window.innerHeight - 50 + "px"};
  max-width: ${props => props.maxWidth};
`;

export const Tiles = styled.div`
  position: inline;
  width: 100%;
  max-width: ${props => props.maxWidth};
  height: ${window.innerHeight - 120 + "px"};
  overflow: auto;
  direction: rtl;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth};
  padding: 20px 0;
  margin-bottom: 30px;
  text-align: center;
  color: ${globals.colours.darkGray};
  font-family: ${globals.fonts.accent};
  border-bottom: thin solid ${globals.colours.lighterGray};
`;

export const Butt = styled.span`
  padding: 0 1em;
  text-decoration: underline;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${globals.colours.charcoal};
  }
`;

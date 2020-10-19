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
  background: yellow;
`;

export const NavContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${props => props.maxWidth};
  height: 300px; /* <- this is the effective min-height */
  max-width: ${props => props.maxWidth};
  top: 0;
  background: sienna;
`;

export const Tiles = styled.div`
  position: inline;
  width: 100%;
  max-width: ${props => props.maxWidth};
  height: ${props => Math.max(props.height - 91, 300) + "px"};
  overflow: auto;
  direction: rtl;
  background: teal;
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

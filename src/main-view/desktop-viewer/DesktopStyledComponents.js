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
  top: 30px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 20px;
  flex-basis: ${props => props.maxWidth};
  height: ${window.innerHeight - 50 + "px"};
  width: ${props => props.maxWidth};
  border-radius: 5px;
  border: thin solid #eaeaea;
  box-shadow: 1px 1px 10px #eeeeee;
`;

export const Tiles = styled.div`
  position: inline;
  height: ${window.innerHeight - 120 + "px"};
  width: calc(100% = 30px);
  padding: 0 15px;
  overflow: auto;
  direction: rtl;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const CarouselContainer = styled.div`
  max-width: ${props => props.maxWidth};
  padding: 25px 0;
  margin-bottom: 0;
  text-align: center;
  color: ${globals.colours.darkGray};
  font-family: ${globals.fonts.copy};
  border-bottom: thin solid ${globals.colours.lighterGray};
`;

export const Butt = styled.span`
  padding: 0 1em;
  text-decoration: underline;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${globals.colours.accentBlue};
  }
`;

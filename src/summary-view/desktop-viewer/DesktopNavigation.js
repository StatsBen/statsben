import React from "react";
import styled from "styled-components";
import EntryTile from "./EntryTile";
import { globals } from "../../globals";

const NAV_MAX_WIDTH = "280px";

const NavContainer = styled.div`
  width: 30%;
  max-width: ${NAV_MAX_WIDTH};
`;

const Tiles = styled.div`
  width: 100%;
  max-width: ${NAV_MAX_WIDTH};
  max-height: ${screen.height - 400 + "px"};
  overflow: auto;
  direction: rtl;
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: ${NAV_MAX_WIDTH};
  padding: 20px 0;
  margin-bottom: 30px;
  text-align: center;
  color: ${globals.colours.darkGray};
  font-family: ${globals.fonts.accent};
  border-bottom: thin solid ${globals.colours.lighterGray};
`;

const Butt = styled.span`
  padding: 0 1em;
  text-decoration: underline;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${globals.colours.charcoal};
  }
`;

const DesktopNavigation = ({
  activeEntry,
  entries,
  handleNextClick,
  handlePrevClick,
  setActiveEntry
}) => (
  <NavContainer>
    <CarouselContainer>
      <Butt onClick={handlePrevClick}>prev</Butt>
      <i>{` ( ${entries.indexOf(activeEntry) + 1} / ${entries.length} ) `}</i>
      <Butt onClick={handleNextClick}>next</Butt>
    </CarouselContainer>
    <Tiles>
      {entries.map((entry, i) => (
        <EntryTile
          key={`e-tile-${i}`}
          entry={entry}
          clickHandler={() => setActiveEntry(entry)}
          isActive={entry === activeEntry}
        ></EntryTile>
      ))}
    </Tiles>
  </NavContainer>
);

export default DesktopNavigation;

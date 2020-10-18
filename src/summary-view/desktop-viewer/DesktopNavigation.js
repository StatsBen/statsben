import React from "react";
import EntryTile from "./EntryTile";
import {
  Butt,
  CarouselContainer,
  NavContainer,
  Tiles
} from "./DesktopStyledComponents";

const NAV_MAX_WIDTH = "280px";

const DesktopNavigation = props => {
  const {
    activeEntry,
    entries,
    handleNextClick,
    handlePrevClick,
    setActiveEntry
  } = props;

  const paginationString = ` ( ${entries.indexOf(activeEntry) + 1} / ${
    entries.length
  } ) `;

  return (
    <NavContainer maxWidth={NAV_MAX_WIDTH}>
      <CarouselContainer maxWidth={NAV_MAX_WIDTH}>
        <Butt onClick={handlePrevClick}>prev</Butt>
        <i>{paginationString}</i>
        <Butt onClick={handleNextClick}>next</Butt>
      </CarouselContainer>
      <Tiles maxWidth={NAV_MAX_WIDTH}>
        {entries.map((entry, i) => (
          <EntryTile
            key={`e-tile-${i}`}
            entry={entry}
            clickHandler={() => setActiveEntry(entry)}
            isActive={entry === activeEntry}
          />
        ))}
      </Tiles>
    </NavContainer>
  );
};

export default DesktopNavigation;

import React from "react";
import EntryTile from "./EntryTile";
import {
  Butt,
  CarouselContainer,
  NavContainer,
  Tiles
} from "./DesktopStyledComponents";

const NAV_MAX_WIDTH = "280px";
const ENTRY_SCROLL_TOP = 605;

const DesktopNavigation = props => {
  const {
    activeEntry,
    entries,
    handleNextClick,
    handlePrevClick,
    height,
    setActiveEntry
  } = props;

  const paginationString = ` ( ${entries.indexOf(activeEntry) + 1} / ${
    entries.length
  } ) `;

  const handleNextAndResetScroll = () => {
    handleNextClick();
    resetScrollY();
  };

  const handlePrevAndResetScroll = () => {
    handlePrevClick();
    resetScrollY();
  };

  const handleTileClick = entry => {
    setActiveEntry(entry);
    resetScrollY();
  };

  const resetScrollY = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > ENTRY_SCROLL_TOP)
      setTimeout(() => {
        window.scrollTo({ top: ENTRY_SCROLL_TOP, behavior: "smooth" });
      }, 200);
  };

  return (
    <NavContainer maxWidth={NAV_MAX_WIDTH}>
      <CarouselContainer maxWidth={NAV_MAX_WIDTH}>
        <Butt onClick={handlePrevAndResetScroll}>prev</Butt>
        <i>{paginationString}</i>
        <Butt onClick={handleNextAndResetScroll}>next</Butt>
      </CarouselContainer>
      <Tiles maxWidth={NAV_MAX_WIDTH} height={height}>
        {entries.map((entry, i) => (
          <EntryTile
            key={`e-tile-${i}`}
            entry={entry}
            clickHandler={() => handleTileClick(entry)}
            isActive={entry === activeEntry}
          />
        ))}
      </Tiles>
    </NavContainer>
  );
};

export default DesktopNavigation;

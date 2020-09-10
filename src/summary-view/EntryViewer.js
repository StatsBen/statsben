import React, { useState } from "react";
import styled from "styled-components";
import Entry from "./Entry";
import EntryTile from "./EntryTile";
import { globals } from "../globals";

const EntryViewerContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Tiles = styled.div`
  width: 30%;
  max-width: 200px;
  max-height: ${screen.height - 400 + "px"};
  overflow: auto;
  direction: rtl;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
`;

const ActiveEntry = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const CarouselContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: ${globals.colours.darkGray};
  font-family: ${globals.fonts.accent};
`;

const Butt = styled.span`
  padding: 0 2em;
  text-decoration: underline;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${globals.colours.charcoal};
  }
`;

const EntryViewer = props => {
  const entries = props.filteredEntryData;
  const [activeEntry, setActiveEntry] = useState(entries[0]);

  if (entries.length && !entries.includes(activeEntry)) {
    setActiveEntry(entries[0]);
  }

  const handleNextClick = () => {
    if (!activeEntry || !entries.length) return;
    const i = entries.indexOf(activeEntry);
    const newI = Math.min(i + 1, entries.length - 1);
    setActiveEntry(entries[newI]);
  };

  const handlePrevClick = () => {
    if (!activeEntry || !entries.length) return;
    const i = entries.indexOf(activeEntry);
    const newI = Math.max(i - 1, 0);
    setActiveEntry(entries[newI]);
  };

  return (
    <div>
      <CarouselContainer>
        <Butt onClick={handlePrevClick}>prev</Butt>
        <i>{` ( ${entries.indexOf(activeEntry) + 1} / ${entries.length} ) `}</i>
        <Butt onClick={handleNextClick}>next</Butt>
      </CarouselContainer>
      <EntryViewerContainer>
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
        <ActiveEntry>
          <Entry entry={activeEntry} />
          <CarouselContainer>
            <Butt onClick={handlePrevClick}>prev</Butt>
            <i>{` ( ${entries.indexOf(activeEntry) + 1} / ${
              entries.length
            } ) `}</i>
            <Butt onClick={handleNextClick}>next</Butt>
          </CarouselContainer>
        </ActiveEntry>
      </EntryViewerContainer>
    </div>
  );
};

export default EntryViewer;

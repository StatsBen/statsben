import React, { useState } from "react";
import styled from "styled-components";
import Entry from "./Entry";
import EntryTile from "./EntryTile";

const EntryViewerContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Tiles = styled.div`
  width: 30%;
  max-width: 200px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
`;

const ActiveEntry = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const EntryViewer = props => {
  const entries = props.filteredEntryData;
  const [activeEntry, setActiveEntry] = useState(entries[0]);

  if (entries.length && !entries.includes(activeEntry)) {
    setActiveEntry(entries[0]);
  }

  return (
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
      </ActiveEntry>
    </EntryViewerContainer>
  );
};

export default EntryViewer;

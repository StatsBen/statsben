import React, { useState } from "react";
import styled from "styled-components";
import Entry from "./Entry";

const EntryViewerContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Tiles = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  width: 30%;
  max-width: 300px;
`;

const EntryTile = styled.div`
`;

const ActiveEntry = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const EntryViewer = props => {
  const entries = props.filteredEntryData;
  const [activeEntry, setActiveEntry] = useState(entries[0]);

  return (
    <EntryViewerContainer>
      <Tiles>
        {entries.map((entry, i) => (
          <EntryTile
            key={`e-tile-${i}`}
            entry={entry}
            onClick={() => setActiveEntry(entry)}
          >
            {entry.name}
          </EntryTile>
        ))}
      </Tiles>
      <ActiveEntry>
        <Entry entry={activeEntry} />
      </ActiveEntry>
    </EntryViewerContainer>
  );
};

export default EntryViewer;

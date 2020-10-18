import React, { useState } from "react";
import styled from "styled-components";
import Entry from "../Entry";
import { globals } from "../../globals";
import DesktopNavigation from "./DesktopNavigation";

const EntryViewerContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    display: none;
  }
`;

const ActiveEntry = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const DesktopEntryViewer = props => {
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

  const desktopNavProps = {
    activeEntry,
    entries,
    handleNextClick,
    handlePrevClick,
    setActiveEntry
  };

  return (
    <EntryViewerContainer>
      <DesktopNavigation {...desktopNavProps} />
      <ActiveEntry>
        <Entry entry={activeEntry} />
      </ActiveEntry>
    </EntryViewerContainer>
  );
};

export default DesktopEntryViewer;

import React, { useState } from "react";
import Entry from "../Entry";
import DesktopNavigation from "./DesktopNavigation";
import { ActiveEntry, EntryViewerContainer } from "./DesktopStyledComponents";

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

  const navProps = {
    activeEntry,
    entries,
    handleNextClick,
    handlePrevClick,
    setActiveEntry
  };

  return (
    <EntryViewerContainer>
      <DesktopNavigation {...navProps} />
      <ActiveEntry>
        <Entry entry={activeEntry} />
      </ActiveEntry>
    </EntryViewerContainer>
  );
};

export default DesktopEntryViewer;

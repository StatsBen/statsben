import React, { useEffect, useState } from "react";
import Entry from "../Entry";
import DesktopNavigation from "./DesktopNavigation";
import { ActiveEntry, EntryViewerContainer } from "./DesktopStyledComponents";
import { useMeasure } from "react-use";

const DesktopEntryViewer = props => {
  const entries = props.filteredEntryData;
  const [activeEntry, setActiveEntry] = useState(entries[0]);
  const [navHeight, setNavHeight] = useState(screen.height - 400);

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

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    console.log(height);
    //Sets initial height
    setNavHeight(height);

    //Adds resize event listener
    window.addEventListener("resize", setNavHeight(height));

    // Clean-up
    return window.removeEventListener("resize", setNavHeight(height));
  }, [height, activeEntry]);

  /**
   * Reset the active entry to the one at the top of the list if the
   * available entries changes (due to filtering, for example).
   */
  useEffect(() => {
    setActiveEntry(entries[0]);
  }, [entries]);

  // useEffect(() => {
  //   console.log(activeEntryRef);
  // }, [activeEntry]);

  const navProps = {
    activeEntry,
    entries,
    handleNextClick,
    handlePrevClick,
    height: navHeight,
    setActiveEntry
  };

  return (
    <EntryViewerContainer>
      <DesktopNavigation {...navProps} />
      <ActiveEntry ref={ref}>
        <Entry entry={activeEntry} />
      </ActiveEntry>
    </EntryViewerContainer>
  );
};

export default DesktopEntryViewer;

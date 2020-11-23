import React, { useState, useEffect } from "react";
import {
  AccordionViewerContainer,
  ShowMoreButton
} from "./AccordionStyledComponents";
import ExpandableAccordionEntry from "./ExpandableAccordionEntry";

const PAGINATION_SIZE = 20;

const AccordionViewer = props => {
  const entries = props.filteredEntryData;

  const [storedEntries, setEntries] = useState(props.entryData);
  const [nVisible, setNVisible] = useState(PAGINATION_SIZE);

  useEffect(() => {
    /**
     * If the list of entries provided by props changes, then reset the
     * number of entries shown back to the default size.
     */
    if (storedEntries !== entries) {
      setEntries(entries);
      setNVisible(PAGINATION_SIZE);
    }
  }, [entries]);

  const handlShowMoreClick = () => {
    const newN = Math.min(nVisible + PAGINATION_SIZE, storedEntries.length);
    setNVisible(newN);
  };

  const entriesToShow = entries.slice(0, nVisible);
  const moreToShow = Boolean(nVisible < entries.length);

  return (
    <AccordionViewerContainer>
      {entriesToShow.map((entry, i) => (
        <ExpandableAccordionEntry key={`accordion-entry-${i}`} entry={entry} />
      ))}

      {moreToShow && (
        <ShowMoreButton>
          <button onClick={handlShowMoreClick}>
            show {Math.min(PAGINATION_SIZE, entries.length - nVisible)} more...
          </button>
        </ShowMoreButton>
      )}
    </AccordionViewerContainer>
  );
};

export default AccordionViewer;

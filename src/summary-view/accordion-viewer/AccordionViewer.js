import React, { useState } from "react";
import {
  AccordionViewerContainer,
  ShowMoreButton
} from "./AccordionStyledComponents";
import ExpandableAccordionEntry from "./ExpandableAccordionEntry";

const PAGINATION_SIZE = 20;

const AccordionViewer = props => {
  const entries = props.entryData;

  // TODO: Come up with some effect hook to reset nVisible when a filter is applied :/

  const [nVisible, setNVisible] = useState(PAGINATION_SIZE);
  const [moreToShow, setMoreToShow] = useState(
    Boolean(nVisible < entries.length)
  );

  const handlShowMoreClick = () => {
    const newN = Math.min(nVisible + PAGINATION_SIZE, entries.length);
    setNVisible(newN);
    if (newN === entries.length) setMoreToShow(false);
    else setMoreToShow(true);
  };

  const entriesToShow = entries.slice(0, nVisible);

  return (
    <AccordionViewerContainer>
      {entriesToShow.map((entry, i) => (
        <ExpandableAccordionEntry key={`accordion-entry-${i}`} entry={entry} />
      ))}

      {moreToShow && (
        <ShowMoreButton onClick={handlShowMoreClick}>
          show more...
        </ShowMoreButton>
      )}
    </AccordionViewerContainer>
  );
};

export default AccordionViewer;

import React from "react";
import { AccordionViewerContainer } from "./AccordionStyledComponents";
import ExpandableAccordionEntry from "./ExpandableAccordionEntry";

const AccordionViewer = props => {
  const entries = props.entryData;
  return (
    <AccordionViewerContainer>
      {entries.map((entry, i) => (
        <ExpandableAccordionEntry key={`accordion-entry-${i}`} entry={entry} />
      ))}
    </AccordionViewerContainer>
  );
};

export default AccordionViewer;

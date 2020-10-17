import React from "react";
import { AccordionViewerContainer } from "./AccordionComponents";
import AccordionEntry from './AccordionEntry';

const AccordionViewer = props => {
  const entries = props.entryData;
  return (
    <AccordionViewerContainer>
      {entries.map((entry, i) => (
        <AccordionEntry key={`accordion-entry-${i}`} entry={entry} />
      ))}
    </AccordionViewerContainer>
  );
};

export default AccordionViewer;

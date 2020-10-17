import React, { useState } from "react";
import Entry from "./Entry";
import { globals } from "../globals";
import { buildDateString } from "../utils/buildDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  CloseButton,
  CloseButtContainer,
  CloseIcon,
  CollapsedChevron,
  CollapsedEntryContainer,
  CollapsedEntryDate,
  CollapsedEntryTitle,
  ExpandedEntryContainer
} from "./AccordionComponents";

const AccordionEntry = ({ entry }) => {
  // const defaultHeight = "100px";

  const [expanded, setExpanded] = useState(false);

  // The height of the content inside of the accordion
  // const [contentHeight, setContentHeight] = useState(defaultHeight);

  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const Collapsed = ({ entry, clickHandler }) => {
    return (
      <CollapsedEntryContainer onClick={clickHandler}>
        <CollapsedEntryDate>
          <span>{buildDateString(entry)}</span>
        </CollapsedEntryDate>
        <CollapsedEntryTitle>{entry.name}</CollapsedEntryTitle>
        <CollapsedChevron>
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{}}
            color={globals.colours.charcoal}
          />
        </CollapsedChevron>
      </CollapsedEntryContainer>
    );
  };

  const Expanded = ({ entry, clickHandler }) => (
    <ExpandedEntryContainer>
      <CloseIcon onClick={clickHandler}>
        <FontAwesomeIcon
          icon={faTimes}
          style={{}}
          color={globals.colours.charcoal}
        />
      </CloseIcon>
      <Entry entry={entry} />
      <CloseButtContainer>
        <CloseButton onClick={clickHandler}>close</CloseButton>
      </CloseButtContainer>
    </ExpandedEntryContainer>
  );

  const ps = { entry, clickHandler: toggleExpanded };

  return (
    <div>
      {expanded && <Expanded {...ps} />}
      {!expanded && <Collapsed {...ps} />}
    </div>
  );
};

export default AccordionEntry;

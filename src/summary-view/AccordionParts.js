import React from "react";
import Entry from "./Entry";
import { globals } from "../globals";
import { buildDateString } from "../utils/buildDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  CloseButton,
  CloseButtContainer,
  CollapsedChevron,
  CollapsedEntryContainer,
  CollapsedEntryDate,
  CollapsedEntryTitle,
  ExpandedEntryContainer
} from "./AccordionStyledComponents";

export const AccordionBanner = ({ entry, clickHandler, expanded }) => {
  return (
    <CollapsedEntryContainer onClick={clickHandler}>
      <CollapsedEntryDate>
        <span>{buildDateString(entry)}</span>
      </CollapsedEntryDate>
      <CollapsedEntryTitle>{entry.name}</CollapsedEntryTitle>
      <CollapsedChevron>
        <FontAwesomeIcon
          icon={expanded ? faTimes : faAngleDown}
          style={{}}
          color={globals.colours.charcoal}
        />
      </CollapsedChevron>
    </CollapsedEntryContainer>
  );
};

export const AccordionContents = ({ entry, clickHandler }) => (
  <ExpandedEntryContainer>
    <Entry entry={entry} />
    <CloseButtContainer>
      <CloseButton onClick={clickHandler}>close</CloseButton>
    </CloseButtContainer>
  </ExpandedEntryContainer>
);

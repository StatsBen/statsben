import React from "react";
import Entry from "./Entry";
import { globals } from "../globals";
import { buildDateString } from "../utils/buildDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  AccordionViewerContainer,
  CloseButton,
  CloseButtContainer,
  CloseIcon,
  CollapsedChevron,
  CollapsedEntryContainer,
  CollapsedEntryDate,
  CollapsedEntryTitle,
  ExpandedEntryContainer
} from "./AccordionComponents";

class AccordionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = () => {
    if (this.state.expanded) {
      setTimeout(() => {
        this.setState({ expanded: !this.state.expanded });
      }, 1000); // Just enough time for the 'disappear' animation to run
    } else {
      this.setState({ expanded: !this.state.expanded });
    }
  };

  static Collapsed = ({ entry, clickHandler }) => {
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

  static Expanded = ({ entry, clickHandler }) => (
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

  render() {
    const { expanded } = this.state;
    const { entry } = this.props;
    const ps = { entry, clickHandler: this.handleClick };

    return (
      <div>
        {expanded && <AccordionEntry.Expanded {...ps} />}
        {!expanded && <AccordionEntry.Collapsed {...ps} />}
      </div>
    );
  }
}

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

import React from "react";
import Entry from "./Entry";
import styled, { keyframes } from "styled-components";
import { globals } from "../globals";
import { buildDateString } from "../utils/buildDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const appear = keyframes`
  0% {
    max-height: 0;
  }

  100% {
    max-height: 2000px;
  }
`;

const disappear = keyframes`
  0% {
    max-height: 2000px;
  }

  100% {
    max-height: 0px;
  }
`;

const AccordionViewerContainer = styled.div`
  width: calc(100% - 100px);
  margin: 0 50px;
  @media (min-width: ${globals.sizes.mobileBreakpoint}) {
    display: none;
  }
`;

const CollapsedEntryContainer = styled.div`
  display: flex;
  width: calc(100% - 20px);
  padding: 15px;
  font-family: ${globals.fonts.accent};
  border-bottom: thin solid ${globals.colours.lighterGray};
  user-select: none;
  &:hover {
    cursor: pointer;
    background: ${globals.colours.lighterGray};
  }
  &:active {
    background: ${globals.colours.mediumGray};
    color: ${globals.colours.white};
  }
`;

const CollapsedEntryDate = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 113px;
  width: 113px;
  background: yellow;
  padding: 0;
  border-right: thin solid ${globals.colours.ligherGray};
  vertical-align: middle;
  span {
    background: orange;
    height: 100%;
  }
`;

const CollapsedEntryTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  padding: 0 0 0 12px;
`;

const CollapsedChevron = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 0 0 0 12px;
  vertical-align: middle;
  svg {
    width: 1em;
    height: 100%;
  }
`;

const ExpandedEntryContainer = styled.div`
  width: 100%;
  border-bottom: thin solid ${globals.colours.lighterGray};
  animation: ${appear} 1s ease 0s 1 none;
  overflow: hidden;
  div {
    /* Select the close button way down in there... */
    span {
      &:active {
        animation: ${disappear} 1s ease 0s 1 none;
      }
    }
  }
`;

const CloseButtContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

const CloseButton = styled.span`
  width: 100%;
  color: black;
  font-family: ${globals.fonts.accent};
  text-align: center;
  text-decoration: underline;
`;

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

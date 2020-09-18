import React from "react";
// import Entry from "../Entry";
import styled from "styled-components";
import { globals } from "../globals";
import { buildDateString } from "../utils/buildDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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

class AccordionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  static Collapsed = ({ entry }) => {
    return (
      <CollapsedEntryContainer>
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

  static Expanded = () => <div>lil test</div>;

  render() {
    const { expanded } = this.state;
    const { entry } = this.props;
    const ps = { entry, clickHandler: this.handleClick };

    return (
      <div onClick={this.handleClick}>
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

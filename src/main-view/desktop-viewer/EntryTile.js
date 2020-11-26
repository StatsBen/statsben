import React from "react";
import styled from "styled-components";
import { globals } from "../../globals";
import { buildDateString } from "../../utils/buildDateString";

const Container = styled.div`
  width: auto;
  margin: 10px;
  padding: 10px;
  font-family: ${globals.fonts.accent};
  font-size: 0.8em;
  color: ${globals.colours.mediumGray};
  border-bottom: thin solid ${globals.colours.lightGray};
  user-select: none;
  direction: ltr;
  &:hover {
    cursor: pointer;
    color: ${globals.colours.charcoal};
  }
  &.active {
    color: ${globals.colours.charcoal};
    font-weight: 900;
    border-bottom: medium solid ${globals.colours.accentBlue};
  }
`;

const EntryTile = ({ clickHandler, entry, isActive }) => {
  return (
    <Container className={isActive ? "active" : ""} onClick={clickHandler}>
      <span>
        {buildDateString(entry)} - {entry.range}
      </span>
    </Container>
  );
};

export default EntryTile;

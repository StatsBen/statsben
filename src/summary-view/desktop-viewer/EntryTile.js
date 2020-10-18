import React from "react";
import styled from "styled-components";
import { globals } from "../../globals";
import { buildDateString } from "../../utils/buildDateString";

const Container = styled.div`
  width: calc(100% - 35px);
  margin: 10px;
  padding: 10px;
  font-family: ${globals.fonts.accent};
  font-size: 0.8em;
  color: ${globals.colours.charcoal};
  border-bottom: thin solid ${globals.colours.lighterGray};
  user-select: none;
  direction: ltr;
  &:hover {
    cursor: pointer;
    background: ${globals.colours.lighterGray};
  }
  &.active {
    color: ${globals.colours.accentBlue};
    background: ${globals.colours.lightBlue};
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

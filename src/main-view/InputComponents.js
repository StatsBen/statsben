import styled from "styled-components";
import Select from "react-select";
import { globals } from "../globals";

export const TypeButton = styled.button`
  margin: 5px;
  padding: 10px;
  font-family: ${globals.fonts.accent};
  text-decoration: underline;
  color: black;
  background: white;
  box-shadow: 1px 1px 5px #eeeeee;
  border: thin solid #ebebeb;
  border-radius: 5px;
  &.active {
    background: ${globals.colours.accentBlue};
    border: none;
    border-radius: 3px;
  }
  &:hover {
    cursor: pointer;
    color: ${globals.colours.mediumGray};
  }
`;

export const RangesSelector = styled(Select)`
  max-width: 300px;
  padding-left: 10px;
  font-family: ${globals.fonts.accent};
`;

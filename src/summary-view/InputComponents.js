import styled from "styled-components";
import Select from "react-select";
import { globals } from "../globals/";

export const TypeButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  background: none;
  font-family: ${globals.fonts.accent};
  text-decoration: underline;
  &.active {
    color: ${globals.colours.accentBlue};
    border: none;
    border-radius: 3px;
  }
  &.inactive {
    background: grey;
  }
  &:focus {
    border: none;
  }
`;

export const RangesSelector = styled(Select)`
  max-width: 300px;
  padding-left: 10px;
  font-family: ${globals.fonts.accent};
`;

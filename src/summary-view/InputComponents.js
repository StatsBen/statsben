import styled from "styled-components";
import Select from "react-select";
import { fonts } from "../globals/fonts";

export const TypeButton = styled.button`
  background: red;
  &.active {
    background: yellow;
  }
  &.inactive {
    background: grey;
  }
`;

export const RangesSelector = styled(Select)`
  max-width: 300px;
  font-family: ${fonts.accent};
`;

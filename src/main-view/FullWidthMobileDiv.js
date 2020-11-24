import {css} from "styled-components";
import { globals } from "../globals";

export const fullWidthMobile = css`
  width: 100%;
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    width: calc(100% - 60px);
    margin: 0 30px;
  }
`;

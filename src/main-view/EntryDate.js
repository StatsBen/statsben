require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { globals } from "../globals";

const EntryDate = props => {
  return (
    <span
      css={css`
        display: block;
        position: relative;
        padding-left: 25px;
        writing-mode: vertical-lr;
        text-align: right;
        font-family: ${globals.fonts.accent};
        font-size: 14pt;
        text-orientation: mixed;
        transform: rotate(180deg);
        @media (min-width: 1400px) {
          width: 22px;
          min-height: 130px;
        }
      `}
    >
      {moment(props.date.toDate()).format("MM - DD - YY")}
    </span>
  );
};

export default EntryDate;

require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../../globals";

const EntryContainer = props => {
  return (
    <div
      css={css`
        position: relative; /* Must be included for absolutely positioned children */
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 90%;
        min-width: 450px;
        height: auto;
        margin: 0px 0 100px 0;
        padding: 0 5% 0 5%;
      `}
    >
      {props.children}
    </div>
  );
};

export default EntryContainer;
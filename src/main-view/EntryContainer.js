require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../../globals";

const EntryContainer = props => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 90%;
        min-width: 550px;
        height: auto;
        margin: 0px 0 50px 0;
        padding: 0 5% 0 5%;
      `}
    >
      {props.children}
    </div>
  );
};

export default EntryContainer;

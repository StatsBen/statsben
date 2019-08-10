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
        float: left;
        width: 90%;
        /* min-width: 550px; */
        height: auto;
        min-height: 80px;
        margin: 0px 0 50px 0;
        padding: 0 5% 0 5%;
        @media (min-width: 1400px) {
          width: 95%;
          margin: 0 0 100px 0;
          break-inside: avoid;
          break-after: avoid;
          page-break-inside: avoid;
          padding: 0 2.5% 0 2.5%;
        }
      `}
    >
      <div
        css={css`
          order: 1;
          @media (max-width: 1400px) {
            flex: 0 1 auto;
          }
          @media (min-width: 1400px) {
            flex: 0 1 auto;
          }
        `}
      >
        {props.children}
      </div>
    </div>
  );
};

export default EntryContainer;

require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../../globals";

const NoEntries = () => {
  return (
    <div
      css={css`
        float: none;
        clear: both;
        width: 100%;
        margin: 300px 0 200px 0;
        break-inside: avoid;
        text-align: center;
      `}
    >
      <strong>Uh oh. Something went wrong!</strong>
      <p>{`Try changing the active filters in the menu or refreshing the page. Sorry about that!`}</p>
    </div>
  );
};

export default NoEntries;

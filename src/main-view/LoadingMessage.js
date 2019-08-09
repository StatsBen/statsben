require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../../globals";

const LoadingMessage = () => {
  return (
    <div
      css={css`
        float: none;
        clear: both;
        width: 100%;
        margin-top: 300px;
        break-inside: avoid;
        text-align: center;
      `}
    >
      <strong>Loading...</strong>
    </div>
  );
};

export default LoadingMessage;

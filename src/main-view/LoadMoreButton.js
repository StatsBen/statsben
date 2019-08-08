require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../globals";

const LoadMoreButton = props => {
  return (
    <div
      css={css`
        float: none;
        width: 100%;
        clear: both;
        padding: 0 0 100px 0;
        text-align: center;
      `}
    >
      <button
        css={css`
          display: inline-block;
          -webkit-display: inline-block;
          background: none;
          outline: none;
          border: none;
          user-select: none;
          font-family: ${globals.fonts.copy};
          font-size: 14pt;
          font-style: italic;
          font-weight: 700;
          color: ${globals.colours.darkGray};
          &:hover {
            cursor: pointer;
            color: ${globals.colours.lightGray};
          }
        `}
        onClick={props.loadMore}
      >
        Load More...
      </button>
    </div>
  );
};

export default LoadMoreButton;

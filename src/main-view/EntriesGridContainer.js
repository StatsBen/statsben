require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Masonry from "react-masonry-css";

const EntriesGridContainer = props => {
  const breakpointColsObj = {
    default: 2,
    1400: 1,
    2200: 2
  };
  // ^ Special object for the react-masonry-css library (see imports)

  return (
    <div
      css={css`
        order: 1;
        flex: 0 1 100%;
        -webkit-flex: 0 1 100%;
        -webkit-flex: 0 1 100%;
      `}
    >
      <Masonry
        breakpointCols={breakpointColsObj}
        columnClassName="my-masonry-grid_column"
        css={css`
          display: -webkit-box; /* Not needed if autoprefixing */
          display: -ms-flexbox; /* Not needed if autoprefixing */
          display: flex;
          margin-left: -30px; /* gutter size offset */
          width: 90%;
          padding: 5%;
        `}
      >
        {props.children}
      </Masonry>

      <div style={{ float: "none", clear: "both", width: "100%" }} />
    </div>
  );
};

export default EntriesGridContainer;

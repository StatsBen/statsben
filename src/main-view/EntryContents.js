require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../../globals";

const EntryHTML = props => {
  return (
    <div
      className={`entry-contents`}
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
};

const EntryTitle = props => {
  return (
    <div>
      <h3
        css={css`
          padding: 0 0 30px 0;
          margin: 0;
          max-width: 70%;
        `}
      >
        {props.name}
      </h3>
    </div>
  );
};

const EntryContents = props => {
  return (
    <div
      css={css`
        order: 2;
        flex: 0 1 auto;
        padding-left: 5%;
        min-height: 10em;
        border-left: thin solid #bbbbbb;
      `}
    >
      <EntryTitle name={props.entry.name} />
      <EntryHTML html={props.entry.html} />
    </div>
  );
};

export default EntryContents;

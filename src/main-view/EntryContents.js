require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../globals";

const EntryHTML = props => {
  return <div css={css``} dangerouslySetInnerHTML={{ __html: props.html }} />;
};

const EntryTitle = props => {
  return (
    <div>
      <h3
        css={css`
          padding: 0 0 0 0;
          margin: 0;
          max-width: 70%;
        `}
      >
        {props.name}
      </h3>
    </div>
  );
};

const EntryRange = props => {
  // if (!props.range || typeof props.range == "undefined") return null;

  return (
    <div
      css={css`
        padding: 0 0 30px 0;
        font-style: italic;
        font-size: 0.9em;
        letter-spacing: 0.05em;
        font-family: ${globals.fonts.accent};
        color: ${globals.colours.lightGray};
      `}
    >
      {!props.range || typeof props.range == "undefined" ? null : props.range}
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
      <EntryRange range={props.entry.range} />
      <EntryHTML html={props.entry.html} />
    </div>
  );
};

export default EntryContents;

require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";

const EditableEntryPopUp = props => {
  const buttonStyle = css`
    margin: 5px;
    padding: 4px;
    border-radius: 3px;
  `;

  return (
    <div
      css={css`
        position: absolute;
        padding: 5px;
        background: ${globals.colours.accentBlue};
        border: thin solid ${globals.colours.lightGray};
        border-radius: ${globals.sizes.borderRadius};
        cursor: pointer;
      `}
    >
      <p
        css={css`
					margin: 0
          padding: 0;
					color: black;
        `}
      >
        Edit this entry?
      </p>
      <button css={buttonStyle} onClick={props.edit}>
        Edit
      </button>
      <button css={buttonStyle} onClick={props.delete}>
        Delete
      </button>
      <button css={buttonStyle}>Close</button>
    </div>
  );
};

export default EditableEntryPopUp;

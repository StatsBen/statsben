require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";

const SubmitButton = props => {
  return (
    <input
      name="finish-button"
      type="submit"
      value="Commit"
      onClick={props.handleSubmit}
      css={css`
        display: inline-block;
        position: relative;
        margin: 50px 0 50px 0;
        padding: 20px;
        background: ${globals.colours.lightBlue};
        font-weight: 700;
        font-size: 1.5em;
        box-shadow: inset 0px 0px 6px #dddddd;
        border-radius: ${globals.sizes.entryPageBorderRadius};
        &:hover {
          background: ${globals.colours.white};
          cursor: pointer;
          user-select: none;
        }
      `}
    />
  );
};

export default SubmitButton;

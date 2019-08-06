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
        display: block;
        position: relative;
        float: left;
        margin: 10px;
        padding: 5px;
        background: #eeeeee;
        font-weight: 700;
        box-shadow: inset 0px 0px 6px #dddddd;
        border-radius: ${globals.sizes.entryPageBorderRadius};
      `}
    />
  );
};

export default SubmitButton;

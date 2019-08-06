require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";
import { formatter } from "../../../utils/formatter";
import { validator } from "../../../utils/validator";

const TextInput = props => {
  const { label, contents, type } = props;

  let valid = true;
  if (contents && type == "string") {
    valid = validator.validateString(contents);
  } else if (contents && type == "date") {
    valid = validator.validateDate(contents);
  }

  const validCSS = css`
    color: ${globals.colours.paragraphText};
  `;

  const invalidCSS = css`
    color: ${globals.colours.invalidRed};
  `;

  const containerCSS = css`
    position: relative;
    float: left;
    margin: 10px;
    background: #eeeeee;
    padding: 5px;
    border-radius: 5px !important;
    border: thin solid #aaaaaa;
    box-shadow: -2px 2px 5px #cccccc;
  `;

  return (
    <div css={containerCSS}>
      <label htmlFor={`input-${label}`}>
        {formatter.toSentenceCase(label)}
      </label>
      <input
        value={contents ? contents : ""}
        onChange={props.handleChange}
        name={`input-${label}`}
        css={valid ? validCSS : invalidCSS}
      />
    </div>
  );
};

export default TextInput;

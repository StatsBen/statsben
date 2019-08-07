require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";
import { formatter } from "../../../utils/formatter";
import { validator } from "../../../utils/validator";

const TextInput = props => {
  const { label, contents, type } = props;

  let valid = true;
  try {
    valid = validator.validateValueByType(contents, type);
  } catch (e) {
    valid = false;
  }

  const validCSS = css`
    color: ${globals.colours.paragraphText};
    font-weight: 400;
    &::placeholder {
      color: ${globals.colours.paragraphText};
      font-weight: 400;
    }
  `;

  const invalidCSS = css`
    color: ${globals.colours.invalidRed};
    font-weight: 900;
    border: thin solid red;
    &::placeholder {
      color: ${globals.colours.invalidRed};
      font-weight: 900;
    }
    &:focus {
      outline-color: ${globals.colours.invalidRed};
    }
  `;

  const containerCSS = css`
    position: relative;
    float: left;
    margin: 10px;
    background: ${globals.colours.lightBlue};
    padding: 5px;
    border-radius: 5px !important;
    border: thin solid ${globals.colours.lightGray};
    box-shadow: -2px 2px 5px #cccccc;
  `;

  return (
    <div css={containerCSS}>
      <label htmlFor={`input-${label}`}>
        {`${formatter.toSentenceCase(label)}: `}
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

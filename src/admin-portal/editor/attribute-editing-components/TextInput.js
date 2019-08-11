import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";
import { formatter } from "../../../utils/formatter";
import { validator } from "../../../utils/validator";
import moment from "moment";

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      label: props.label,
      type: props.type,
      contents: props.contents
    };
  }

  handleChange = event => {
    let contents = event.target.value;
    let valid = true;
    try {
      valid = validator.validateEntryAttrByName(contents, this.props.type);
    } catch (e) {
      valid = false;
    }
    this.setState({ valid, contents });

    this.props.handleChange(event);
  };

  render() {
    let { label, contents, type } = this.props;
    const { valid } = this.state;
    console.log("label: " + label);
    console.log("type: " + type);
    console.log("contents: " + contents);

    if (contents && type == "date") {
      try {
        contents = moment(contents.toDate()).format("MM/DD/YY");
      } catch (e) {
        // Do nothing
      }
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
          onChange={this.handleChange}
          name={`input-${label}`}
          css={valid ? validCSS : invalidCSS}
        />
      </div>
    );
  }
}

export default TextInput;

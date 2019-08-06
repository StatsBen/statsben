require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";
import { formatter } from "../../../utils/formatter";
// import { validator } from "../../../utils/validator";

/** The styling for this lil' on/off switch pretty closely mimics this W3C School tutorial:
https://www.w3schools.com/howto/howto_css_switch.asp **/
const ToggleButton = props => {
  const { label, checked } = props;

  const height = 1.2 * globals.sizes.baseFontSize;
  const width = 2 * globals.sizes.baseFontSize;

  const containerCSS = css`
    position: relative;
    display: inline-block;
    width: ${width + "px"};
    height: ${height + "px"};
  `;

  /** The actual input element is hidden in this case - just holds the 'checked' attribute **/
  const Input = () => {
    return (
      <input
        name={`input-${label}`}
        checked={checked}
        onChange={props.handleChange}
        css={css`
          opacity: 0;
          width: 0;
          height: 0;
        `}
      />
    );
  };

  /** This renders the switch in the 'off' position **/
  const OffSwitch = () => {
    return (
      <div css={containerCSS}>
        <span
          css={css`
            position: absolute;
            cursor: pointer;
            top: 5px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${globals.colours.fadedDark};
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: ${height + "px"};
            &:before {
              position: absolute;
              content: "";
              height: ${height - 2 * 4 + "px"};
              width: ${height - 2 * 4 + "px"};
              top: 1px;
              left: 4px;
              bottom: 4px;
              background-color: white;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 50%;
            }
          `}
        />
      </div>
    );
  };

  /** Renders the switch in the 'on' position (blue background, dot to right) **/
  const OnSwitch = () => {
    return (
      <div css={containerCSS}>
        <span
          css={css`
            position: absolute;
            cursor: pointer;
            top: 5px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${globals.colours.accentBlue};
            -webkit-transform: translateX(${height - 2 * 4 + "px"});
            -ms-transform: translateX(${height - 2 * 4 + "px"});
            transform: translateX(${height - 2 * 4 + "px"});
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: ${height + "px"};
            &:before {
              position: absolute;
              content: "";
              height: ${height - 2 * 4 + "px"};
              width: ${height - 2 * 4 + "px"};
              top: 1px;
              left: 4px;
              bottom: 4px;
              background-color: white;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 50%;
            }
          `}
        />
      </div>
    );
  };

  const Label = () => {
    return (
      <label
        htmlFor={`input-${label}`}
        css={css`
          margin: 0 5px 0 0;
        `}
      >
        {formatter.toSentenceCase(label)}
      </label>
    );
  };

  return (
    <div
      css={css`
        position: relative;
        float: left;
        padding: 5px;
        margin: 10px;
        background: #eeeeee;
        border-radius: 5px !important;
        border: thin solid #aaaaaa;
        box-shadow: -2px 2px 5px #cccccc;
      `}
    >
      <Label />
      <Input />
      {checked ? <OnSwitch /> : <OffSwitch />}
    </div>
  );
};

export default ToggleButton;

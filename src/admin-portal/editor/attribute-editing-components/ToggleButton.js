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

  const delegateChangeEvent = () => {
    let target = document.getElementById(`input-${label}`);
    target.checked = !target.checked;
    let e = {};
    e.target = target;
    props.handleChange(e);
  };

  const handleKeyEvent = event => {
    if (event.keyCode === 32) {
      delegateChangeEvent();
    }
  };

  /** The actual input element is hidden in this case - just holds the 'checked' attribute **/
  const Input = () => {
    return (
      <input
        name={`input-${label}`}
        id={`input-${label}`}
        type="checkbox"
        checked={checked ? true : false}
        onChange={delegateChangeEvent}
        onClick={delegateChangeEvent}
        css={css`
          opacity: 0;
          position: absolute;
          z-index: 3;
          width: 0;
          height: 0;
        `}
      />
    );
  };

  /** This renders the switch in the 'off' position **/
  const OffSwitch = () => {
    return (
      <div
        css={containerCSS}
        onClick={delegateChangeEvent}
        onKeyDown={handleKeyEvent}
        role="button"
        tabIndex="0"
      >
        <span
          css={css`
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${globals.colours.mediumGray};
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: ${height + "px"};
            border: thin solid ${globals.colours.charcoal};
            &:before {
              position: absolute;
              content: "";
              height: ${height - 2 * 4 + "px"};
              width: ${height - 2 * 4 + "px"};
              left: ${height * 0.15 + "px"};
              bottom: ${height * 0.15 + "px"};
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
      <div
        css={containerCSS}
        onClick={delegateChangeEvent}
        onKeyDown={handleKeyEvent}
        role="button"
        tabIndex="0"
      >
        <span
          css={css`
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${globals.colours.accentBlue};
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: ${height + "px"};
            border: thin solid ${globals.colours.charcoal};
            &:before {
              position: absolute;
              content: "";
              height: ${height - 2 * 4 + "px"};
              width: ${height - 2 * 4 + "px"};
              left: ${height * 0.15 + "px"};
              bottom: ${height * 0.15 + "px"};
              -webkit-transform: translateX(${height - 2 * 4 + "px"});
              -ms-transform: translateX(${height - 2 * 4 + "px"});
              transform: translateX(${height - 2 * 4 + "px"});
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
        {`${formatter.toSentenceCase(label)}: `}
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
        background: ${globals.colours.lightBlue};
        border-radius: 5px !important;
        border: thin solid ${globals.colours.lightGray};
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

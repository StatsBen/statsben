import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../globals";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    logout: PropTypes.func
  };

  render() {
    return (
      <div id="login-pane">
        <button
          onClick={this.props.logout}
          className={`editor-button`}
          css={css`
            float: right;
            font-size: 1.1em;
            padding: 5px
            margin: 50px 0 0 80%;
            border-radius: 5px;
            user-select: none;
            background: ${globals.colours.lightBlue};
            &:hover {
              cursor: pointer;
              background: white;
            }
          `}
        >
          Log Out
        </button>
      </div>
    );
  }
}

export default Logout;

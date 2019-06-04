import React from "react";
import PropTypes from "prop-types";

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
        <button onClick={this.props.logout} className={`editor-button`}>
          Log Out
        </button>
      </div>
    );
  }
}

export default Logout;

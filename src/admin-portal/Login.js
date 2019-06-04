import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    login: PropTypes.func
  };

  render() {
    return (
      <div id="login-pane">
        <span>You must log in to edit</span>
        <button onClick={this.props.login} className={`editor-button`}>
          Log in w/ Google{" "}
        </button>
      </div>
    );
  }
}

export default Login;

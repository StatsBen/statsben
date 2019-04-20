import React from "react";
import "./auth.css";

class Login extends React.Component {
  render() {
    return (
      <div id="auth-outer-container" style={{ display: "none" }}>
        <div id="auth-background" />
        <div id="auth-container">
          <span>Login</span>
          <form id="login-form">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" />
            <label htmlFor="pass">Password</label>
            <input name="pass" type="text" />
            <input type="submit" value="Enter" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

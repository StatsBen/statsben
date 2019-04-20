import React from "react";
import Login from "../authentication/Login";
import Editor from "./editor/Editor";
import { auth } from "../authentication/firebase";

class AdminPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentEntry: null, entries: null, user: null };
  }

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ user })
    );
  };

  render() {
    return (
      <div>
        <h1>Welcome Back, Ben!</h1>
        <Editor />
        <Login />
      </div>
    );
  }
}

export default AdminPortal;

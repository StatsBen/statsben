import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Editor from "./editor/Editor";
import { auth, signInWithGoogle, signOut } from "../authentication/firebase";

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

  login = () => {
    signInWithGoogle();
  };

  logout = () => {
    signOut();
  };

  render() {
    const { user } = this.state;
    return (
      <div id="admin-portal">
        <h3 id="admin-welcome-message">Welcome Back, Ben!</h3>
        {user ? (
          <div>
            <Logout logout={this.logout} />
            <Editor />
          </div>
        ) : (
          <Login login={this.login} />
        )}
      </div>
    );
  }
}

export default AdminPortal;

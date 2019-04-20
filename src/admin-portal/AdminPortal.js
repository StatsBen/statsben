import React from "react";
import WritingBox from "./WritingBox";
import EntryEditor from "./EntryEditor";
import Login from "../authentication/Login";
import { auth, firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";

class AdminPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null, user: null };
  }

  unsubscribeFromAuth = null;
  unsubscribeFromFirestore = null;

  componentDidMount = async () => {};

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => tidyEntry(doc));
        this.setState({ entries });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ user })
    );
  };

  render() {
    const { entries, user } = this.state;
    return (
      <div>
        <h1>Welcome Back, Ben!</h1>
        <WritingBox />
        <EntryEditor entries={entries} user={user} />
        <Login />
      </div>
    );
  }
}

export default AdminPortal;

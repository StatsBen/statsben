import React from "react";
import NavBar from "../nav-bar/NavBar";
import CategoriesView from "./categories-view/CategoriesView";
import FeaturedEntries from "./featured-entries/FeaturedEntries";
import OtherEntries from "./other-entries/OtherEntries";
import { firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";

class EntriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null };
  }

  unsubscribeFromFirestore = null;

  setStateFromEntries = snapshot => {
    const entries = snapshot.docs.map(doc => tidyEntry(doc));
    this.setState({ entries });
  };

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .onSnapshot(snapshot => {
        this.setStateFromEntries(snapshot);
      });
  };

  render() {
    const { entries } = this.state;
    return (
      <div id="entries-container">
        <NavBar />
        <CategoriesView categories={entries} />
        <FeaturedEntries entries={entries} />
        <OtherEntries entries={entries} />
        <div id="normal-entries" />
        <h1> Test, yep the entries will appear here!</h1>
      </div>
    );
  }
}

export default EntriesView;

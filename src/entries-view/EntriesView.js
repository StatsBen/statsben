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
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => tidyEntry(doc));
        this.setState({ entries });
      });
  };

  render() {
    return (
      <div id="entries-container">
        <NavBar />
        <CategoriesView categories={this.state.categories} />
        <FeaturedEntries entries={this.state.featuredEntries} />
        <OtherEntries entries={this.state.otherEntries} />
        <div id="normal-entries" />
        <h1> Test, yep the entries will appear here!</h1>
      </div>
    );
  }
}

export default EntriesView;

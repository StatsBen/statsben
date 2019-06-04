import React from "react";
import NavBar from "../nav-bar/NavBar";
import CategoriesView from "./categories-view/CategoriesView";
import FeaturedEntries from "./featured-entries/FeaturedEntries";
import OtherEntries from "./other-entries/OtherEntries";
import { firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";
import "./entries-view.css";

class EntriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null,
      featuredEntries: null,
      otherEntries: null,
      activeCategory: null,
      categories: [
        "alpine",
        "scrambling",
        "hiking",
        "running",
        "project",
        "other"
      ]
    };
  }

  unsubscribeFromFirestore = null;

  // Filter entries by featured/not, and by active filter category then
  // set the state based on those filtered entry lists
  setStateFromEntries = entries => {
    const category = this.state.activeCategory || null;

    const featuredEntries = entries.filter(
      entry =>
        entry["Is Featured"] &&
        (category ? entry["Category"].includes(category) : true)
    );

    const otherEntries = entries.filter(
      entry =>
        !entry["Is Featured"] &&
        (category ? entry["Category"].includes(category) : true)
    );

    this.setState({ entries, featuredEntries, otherEntries });
  };

  setActiveCategory = newActive => {
    this.setState({ activeCategory: newActive });
    this.setStateFromEntries(this.state.entries);
  };

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .limit(20)
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => tidyEntry(doc));
        this.setStateFromEntries(entries);
      });
  };

  render() {
    const { categories, featuredEntries, otherEntries } = this.state;
    return (
      <div id="entries-container">
        <NavBar />
        <CategoriesView categories={categories} />
        <FeaturedEntries entries={featuredEntries} />
        <OtherEntries entries={otherEntries} />
      </div>
    );
  }
}

export default EntriesView;

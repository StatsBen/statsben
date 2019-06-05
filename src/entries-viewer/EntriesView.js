import React from "react";
import NavBar from "./nav-bar/NavBar";
import Menu from "./menu/Menu";
import Entries from "./Entries";
import { firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";

class EntriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null,
      categories: [
        "alpine",
        "scrambling",
        "hiking",
        "running",
        "project",
        "other"
      ],
      limit: 20,
      alreadyLoaded: 0,
      typeFilters: []
    };
  }

  setActiveCategory = newActive => {
    this.setState({ activeCategory: newActive });
    this.setStateFromEntries(this.state.entries);
  };

  componentDidMount = async () => {
    this.loadEntries();
  };

  loadEntries = async () => {
    let q = await firestore
      .collection("entries")
      .limit(this.state.limit)
      .orderBy("date", "desc");

    q.get().then(snapshot => {
      const entries = snapshot.docs.map(doc => tidyEntry(doc));
      this.setState({
        entries,
        alreadyLoaded: snapshot.docs[snapshot.docs.length - 1]
      });
    });
  };

  loadMoreEntries = async () => {
    let q = await firestore
      .collection("entries")
      .orderBy("date", "desc")
      .startAfter(this.state.alreadyLoaded)
      .limit(this.state.limit);

    q.get().then(snapshot => {
      console.log(snapshot);
      const entries = snapshot.docs.map(doc => tidyEntry(doc));
      this.setState({
        entries: [...this.state.entries, ...entries],
        alreadyLoaded: snapshot.docs[snapshot.docs.length - 1]
      });
    });
  };

  loadMore = event => {
    event.preventDefault();
    this.loadMoreEntries();
    console.log(`You're a fart, Ben. You suck...`);
  };

  addTypeFilter = event => {
    event.preventDefault();
    let type = event.target.getAttribute("type");
    this.setState({
      typeFilters: [...this.state.typeFilters, ...[type]]
    });
  };

  removeTypeFilter = event => {
    event.preventDefault();
    let type = event.target.getAttribute("type");
    let newFilters = this.state.typeFilters;
    let i = this.state.typeFilters.indexOf(type);
    newFilters.splice(i, 1);
    this.setState({ typeFilters: newFilters });
  };

  render() {
    const { entries } = this.state;
    return (
      <div id="main-entries-container">
        <NavBar />
        <div id="page-splitter">
          <div id="entries-right-menu">
            <Menu
              addType={this.addTypeFilter}
              removeType={this.removeTypeFilter}
              activeTypeFilters={this.state.typeFilters}
              types={this.state.categories}
            />
          </div>
          <div id="entries-left-side">
            <Entries entries={entries} />
            <div id="load-more-button">
              <button onClick={this.loadMore}>Load More...</button>
            </div>
          </div>
        </div>
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default EntriesView;

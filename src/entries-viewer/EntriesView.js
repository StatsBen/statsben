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
        "rock",
        "hiking",
        "running",
        "project",
        "other"
      ],
      limit: 20,
      alreadyLoaded: null,
      typeFilters: []
    };
  }

  componentDidMount = async () => {
    this.loadEntries();
  };

  generateFirestoreFilters = ref => {
    if (this.state.typeFilters.length) {
      let filters = [];
      this.state.typeFilters.map(type => {
        let tempQ = ref.where("types", "array-contains", type);
        filters.push(tempQ._query.filters[0]);
      });

      return filters;
    } else {
      return [];
    }
  };

  loadEntries = async () => {
    let entriesRef = await firestore.collection("entries");

    let q = entriesRef.orderBy("date", "desc").limit(this.state.limit);

    q._query.filters = this.generateFirestoreFilters(entriesRef);

    q.get().then(snapshot => {
      const entries = snapshot.docs.map(doc => tidyEntry(doc));
      this.setState({
        entries,
        alreadyLoaded: snapshot.docs[snapshot.docs.length - 1]
      });
    });
  };

  loadMoreEntries = async () => {
    let entriesRef = await firestore.collection("entries");

    let q = entriesRef
      .orderBy("date", "desc")
      .startAfter(this.state.alreadyLoaded)
      .limit(this.state.limit);

    q._query.filters = this.generateFirestoreFilters(entriesRef);

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
    this.setState({ typeFilters: [type], alreadyLoaded: null }, () => {
      this.loadEntries();
    });
  };

  removeTypeFilter = event => {
    event.preventDefault();
    this.setState({ typeFilters: [] }, () => {
      this.loadEntries();
    });
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

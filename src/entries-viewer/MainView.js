import React from "react";
import NavBar from "./nav-bar/NavBar";
import Menu from "./menu/Menu";
import Footer from "../footer/Footer";
import Entry from "./Entry";
import { firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";
import "./entries.css";
import { globals } from "../globals/globals";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      categories: globals.categories,
      limit: 5,
      alreadyLoaded: null,
      typeFilters: [],
      moreToLoad: true
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

    let q = null;

    if (this.state.alreadyLoaded) {
      q = entriesRef
        .orderBy("date", "desc")
        .startAfter(this.state.alreadyLoaded)
        .limit(this.state.limit);
    } else {
      q = entriesRef.orderBy("date", "desc").limit(this.state.limit);
    }

    q._query.filters = this.generateFirestoreFilters(entriesRef);

    q.get().then(snapshot => {
      const entries = snapshot.docs.map(doc => tidyEntry(doc));
      this.setState((state, snapshot) => ({
        entries: [...state.entries, ...entries],
        alreadyLoaded: snapshot.docs[snapshot.docs.length - 1],
        moreToLoad: snapshot.docs.length == state.limit
      }));
    });
  };

  addTypeFilter = event => {
    event.preventDefault();
    let type = event.target.getAttribute("type");
    this.setState(
      { typeFilters: [type], alreadyLoaded: null, entries: [] },
      () => {
        this.loadEntries();
      }
    );
  };

  removeTypeFilter = event => {
    event.preventDefault();
    this.setState({ typeFilters: [], entries: [] }, () => {
      this.loadEntries();
    });
  };

  buildEntriesListOutput = () => {
    const { entries } = this.state;

    let entryElements = null;
    if (entries) {
      entryElements = entries.map((entry, i) => {
        return <Entry key={`entry-${i}`} entry={entry} />;
      });
    }

    return (
      <div id="entries-right-side">
        <div id="entries-container">
          {entryElements}
          <div style={{ float: "none", clear: "both", width: "100%" }} />
        </div>

        <div id="load-more-button">
          <button onClick={this.loadEntries}>Load More...</button>
        </div>
        {/* <- end of Entries Right Stide */}
      </div>
    );
  };

  render() {
    const entryElements = this.buildEntriesListOutput();

    return (
      <div id="main-entries-container">
        <NavBar />

        <div id="page-splitter">
          {/* ^ Outer container for some fancy, auto scaling FlexBox sorcery */}

          {entryElements}
          {/*Generated Above w/ buildEntriesListOutput */}

          <Menu
            addType={this.addTypeFilter}
            removeType={this.removeTypeFilter}
            activeTypeFilters={this.state.typeFilters}
            types={this.state.categories}
          />
        </div>
        {/*<- end of Page Splitter */}

        <Footer />
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default MainView;

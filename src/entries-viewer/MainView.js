import React from "react";
import NavBar from "./nav-bar/NavBar";
import Menu from "./menu/Menu";
import Footer from "../footer/Footer";
import Entries from "./Entries";
import { firestore } from "../authentication/firebase";
import { tidyEntry } from "../utils";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      categories: [
        "alpine",
        "rock",
        "skiing",
        "scrambling",
        "hiking",
        "running",
        "ice",
        "projects",
        "work",
        "certifications",
        "publications",
        "other"
      ],
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
      this.setState({
        entries: [...this.state.entries, ...entries],
        alreadyLoaded: snapshot.docs[snapshot.docs.length - 1],
        moreToLoad: snapshot.docs.length == this.state.limit
      });
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

  render() {
    const { entries } = this.state;

    let loadMoreButt = (
      <div id="load-more-button">
        <button onClick={this.loadEntries}>Load More...</button>
      </div>
    );

    return (
      <div id="main-entries-container">
        <NavBar />
        <div id="page-splitter">
          <Menu
            addType={this.addTypeFilter}
            removeType={this.removeTypeFilter}
            activeTypeFilters={this.state.typeFilters}
            types={this.state.categories}
          />

          <div id="entries-right-side">
            <Entries entries={entries} />
            {this.state.moreToLoad ? loadMoreButt : null}
            <Footer />
          </div>
        </div>
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default MainView;

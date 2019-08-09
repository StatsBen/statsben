import React from "react";
import NavBar from "./lil-header/LilHeader";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Entry from "./Entry";
import LoadingMessage from "./LoadingMessage";
import LoadMoreButton from "./LoadMoreButton";
import NoEntries from "./NoEntries";
import { firestore } from "../authentication/firebase";
import "./styles/entries.css";
import { globals } from "../globals";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      types: globals.types,
      limit: 5,
      alreadyLoaded: null,
      activeFilters: [],
      moreToLoad: true,
      loading: true,
      noEntries: false
    };
  }

  componentDidMount = async () => {
    this.loadEntries();
  };

  loadEntries = async () => {
    let q = await firestore.collection("entries");

    if (this.state.alreadyLoaded) {
      q = q.orderBy("date", "desc");
      q = q.startAfter(this.state.alreadyLoaded);
      q = q.limit(this.state.limit);
    } else {
      q = q.orderBy("date", "desc");
      q = q.limit(this.state.limit);
    }

    if (this.state.activeFilters.length) {
      this.state.activeFilters.map(type => {
        q = q.where(`types.${type}`, "==", true);
      });
    }

    q.get()
      .then(snapshot => {
        console.log(snapshot);

        if (snapshot.empty) {
          this.setState({
            entries: [],
            alreadyLoaded: null,
            loading: false,
            noEntries: true,
            moreToLoad: false
          });
        } else {
          const entries = snapshot.docs.map(doc => doc.data());
          this.setState(state => ({
            entries: [...state.entries, ...entries],
            alreadyLoaded: snapshot.docs[snapshot.docs.length - 1],
            loading: false,
            noEntries: false,
            moreToLoad: this.state.limit == snapshot.docs.length
          }));
        }
      })
      .catch(err => {
        console.error("Firestore error!");
        console.error(err);
        alert("Uh oh! Something just broke... please reload the page.");
      });
  };

  addTypeFilter = event => {
    event.preventDefault();
    const type = event.target.innerHTML;

    this.setState(
      state => {
        const updatedList = state.activeFilters;
        updatedList.push(type);
        return {
          activeFilters: updatedList,
          entries: [],
          alreadyLoaded: null,
          loading: true,
          noEntries: false
        };
      },
      () => {
        this.loadEntries();
      }
    );
  };

  removeTypeFilter = event => {
    event.preventDefault();
    const type = event.target.innerHTML;

    this.setState(
      state => {
        if (state.activeFilters.includes(type)) {
          const i = state.activeFilters.indexOf(type);
          const updatedList = state.activeFilters;
          updatedList.splice(i, 1);
          return {
            activeFilters: updatedList,
            entries: [],
            alreadyLoaded: null,
            loading: true,
            noEntries: false
          };
        } else {
          console.error("Error in 'removeTypeFilter' method");
          console.error(
            "Some crazy how you're turning off a filter that wasn't turned on in the first place..."
          );
        }
      },
      () => {
        this.loadEntries();
      }
    );
  };

  render() {
    const {
      entries,
      activeFilters,
      types,
      loading,
      noEntries,
      moreToLoad
    } = this.state;

    return (
      <div id="main-entries-container">
        <NavBar />

        {/* Show message if query returns empty snapshot... */}
        {noEntries ? <NoEntries /> : null}

        {/* Show loading component if state is loading */}
        {loading ? <LoadingMessage /> : null}

        <div id="page-splitter">
          {/* ^ Outer container for some fancy, auto scaling FlexBox sorcery */}
          <div id="entries-right-side">
            <div id="entries-container">
              {entries.map((entry, i) => {
                return <Entry key={`entry-${i}`} entry={entry} />;
              })}

              <div style={{ float: "none", clear: "both", width: "100%" }} />
            </div>

            {/* <- end of Entries Right Stide */}
          </div>
          {/*Generated Above w/ buildEntriesListOutput */}
          <Menu
            addType={this.addTypeFilter}
            removeType={this.removeTypeFilter}
            activeFilters={activeFilters}
            types={types}
          />
        </div>
        {/*<- end of Page Splitter */}

        {!loading ? (
          <LoadMoreButton loadMore={this.loadEntries} moreToLoad={moreToLoad} />
        ) : null}

        <Footer />
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default MainView;

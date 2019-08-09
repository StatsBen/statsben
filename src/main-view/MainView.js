import React from "react";
import NavBar from "./lil-header/LilHeader";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Entry from "./Entry";
import LoadMoreButton from "./LoadMoreButton";
import { firestore } from "../authentication/firebase";
import "./styles/entries.css";
import { globals } from "../globals";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      categories: globals.types,
      limit: 5,
      alreadyLoaded: null,
      activeFilters: [],
      moreToLoad: true
    };
  }

  componentDidMount = async () => {
    this.loadEntries();
  };

  // generateFirestoreFilters = ref => {
  //   if (this.state.typeFilters.length) {
  //     let filters = [];
  //     this.state.typeFilters.map(type => {
  //       let tempQ = ref.where("types", "array-contains", type);
  //       filters.push(tempQ._query.filters[0]);
  //     });
  //
  //     return filters;
  //   } else {
  //     return [];
  //   }
  // };

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
        const entries = snapshot.docs.map(doc => doc.data());
        this.setState(state => ({
          entries: [...state.entries, ...entries],
          alreadyLoaded: snapshot.docs[snapshot.docs.length - 1]
          // moreToLoad: snapshot.docs.length == state.limit
        }));
      })
      .catch(err => {
        console.error("Firestore error!");
        console.error(err);
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
          alreadyLoaded: null,
          entries: []
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
            alreadyLoaded: null
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

  resetTypeFilters = () => {
    this.setState({ activeFilters: [] });
  };

  render() {
    return (
      <div id="main-entries-container">
        <NavBar />

        <div id="page-splitter">
          {/* ^ Outer container for some fancy, auto scaling FlexBox sorcery */}
          <div id="entries-right-side">
            <div id="entries-container">
              {this.state.entries.map((entry, i) => {
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
            activeFilters={this.state.activeFilters}
            types={this.state.categories}
          />
        </div>
        {/*<- end of Page Splitter */}

        <LoadMoreButton loadMore={this.loadEntries} />

        <Footer />
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default MainView;

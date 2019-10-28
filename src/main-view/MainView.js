import React from "react";
import NavBar from "./lil-header/LilHeader";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Entry from "./Entry";
import EntriesGridContainer from "./EntriesGridContainer";
import LoadingMessage from "./LoadingMessage";
import LoadMoreButton from "./LoadMoreButton";
import NoEntries from "./NoEntries";
import { connect } from "react-redux";
import { fetchFiveMore } from "../actions/actions";
import "./styles/entries.css";
import { globals } from "../globals";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeFilters: [] };
  }

  componentDidMount = async () => {
    this.loadEntries();
  };

  loadEntries = async () => {
    const { fetchFiveMore } = this.props;
    fetchFiveMore();
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
      waitingForFirestore,
      // activeFilters,
      moreToLoad
    } = this.props;

    const { activeFilters } = this.state;

    console.log(this.props);

    return (
      <div id="main-entries-container">
        <NavBar />

        {/* Show message if query returns empty snapshot... */}
        {entries.length == 0 ? <NoEntries /> : null}

        {/* Show loading component if state is loading */}
        {waitingForFirestore ? <LoadingMessage /> : null}

        <div id="page-splitter">
          {/* ^ Outer container for some fancy, auto scaling FlexBox sorcery */}

          <EntriesGridContainer>
            {entries.map((entry, i) => {
              return <Entry key={`entry-${i}`} entry={entry} />;
            })}
          </EntriesGridContainer>

          {/*Generated Above w/ buildEntriesListOutput */}
          <Menu
            addType={this.addTypeFilter}
            removeType={this.removeTypeFilter}
            activeFilters={activeFilters}
            types={globals.types}
          />
        </div>
        {/*<- end of Page Splitter */}

        {/* Only show the Load More link if the state isn't loading... */}
        {!waitingForFirestore ? (
          <LoadMoreButton loadMore={this.loadEntries} moreToLoad={moreToLoad} />
        ) : null}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entriesReducer.entries,
  waitingForFirestore: state.entriesReducer.waitingForFirestore,
  firestoreError: state.entriesReducer.firestoreError,
  // activeFilters: state.activeFilters,
  moreToLoad: state.entriesReducer.moreToLoad,
  lastLoaded: state.entriesReducer.lastLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchFiveMore: () => dispatch(fetchFiveMore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);

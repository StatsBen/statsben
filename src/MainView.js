import React from "react";
import Entry from "./Entry";
import { EntriesContainer } from "./EntryComponents";
import Loading from "./Loading";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";
import { getEntriesCount, firestore } from "./authentication/firebase";
import { types } from "./globals/types";
import AboutModal from "./modals/About";

const entryActionTypes = Object.freeze({
  ENTRIES_FAILED: "ENTRIES_FAILED",
  ENTRIES_LOADED: "ENTRIES_LOADED",
  FILTER_APPLIED: "FILTER_APPLIED",
  FILTER_REMOVED: "FILTER_REMOVED",
  GET_PREV_ENTRIES: "GET_PREV_ENTRIES",
  REQUEST_NEXT_ENTRY: "REQUEST_NEXT_ENTRY"
});

const initialState = {
  activeFilters: [],
  entries: [],
  entryHistory: [],
  entriesPerPage: 1, // TODO: Make this screen size dependant
  loading: true,
  nPages: null,
  page: 0,
  showAboutModal: false,
  showMenuModal: false
};

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  customReducer(action) {
    if (!action.type) throw new Error("Your actions need types, Ben!");

    let newState = Object.assign({}, this.state);

    let filters = this.state.activeFilters.length
      ? this.state.activeFilters
      : null;

    if (action.type === entryActionTypes.ENTRIES_FAILED) {
      console.log("A request for more entries failed!");
      console.error("Firestore error!");
      console.error(action.err);
      // TODO: show an error modal instead?
    }

    if (action.type === entryActionTypes.REQUEST_NEXT_ENTRY) {
      if (newState.page == newState.nPages) return; // Do nothing

      newState.loading = true;

      newState.page++;

      let start = newState.entryHistory[newState.entryHistory.length - 1];
      let end = null;

      this.loadEntries(filters, start, end);
    }

    if (action.type === entryActionTypes.ENTRIES_LOADED) {
      if (!action.snapshot || action.snapshot.empty) {
        // TODO: This is an error :/ handle it!
      } else {
        newState.entryHistory = [
          ...newState.entryHistory,
          ...action.snapshot.docs
        ];

        newState.loading = false;

        const entries = action.snapshot.docs.map(doc => doc.data());

        newState.entries = entries;
      }
    }

    if (action.type === entryActionTypes.GET_PREV_ENTRIES) {
      if (newState.page == 1) return; // Do nothing

      newState.entries = [];

      // Pop off the current entry(ies) you don't want
      for (let i = 0; i < newState.entriesPerPage; i++) {
        newState.entryHistory.pop();
      }

      let entry, index;

      for (let i = 0; i < newState.entriesPerPage; i++) {
        index = newState.entryHistory.length - newState.entriesPerPage + i;
        entry = newState.entryHistory[index].data();
        newState.entries.push(entry);
      }

      newState.page--;
    }

    if (action.type === entryActionTypes.FILTER_APPLIED) {
      if (!action.typeToAdd) {
        console.error("POOOO");
        return;
      }

      newState.activeFilters = [action.typeToAdd]; // yeah, overwrite the array for now...
      newState.loading = true;
      newState.entryHistory = [];
      newState.entries = [];
      newState.nPages = null;
      newState.page = 1;

      this.loadEntries(newState.activeFilters, null, null);
      this.requestEntriesCount(action.typeToAdd);
    }

    if (action.type === entryActionTypes.FILTER_REMOVED) {
      if (!action.typeToRemove) {
        console.error('that action needs a "typeToRemove" property');
        return;
      }

      const indexToRemove = newState.activeFilters.indexOf(action.typeToRemove);

      if (indexToRemove >= 0) {
        newState.activeFilters.splice(indexToRemove, 1);
        newState.loading = true;
        newState.entryHistory = [];
        newState.entries = [];
        newState.nPages = null;
        newState.page = 1;
        this.loadEntries(newState.activeFilters, null, null);
        this.requestEntriesCount(action.typeToAdd);
      } else {
        console.error(
          "You're trying to remove an active filter that doesn't exist"
        );
        return;
      }
    }

    this.setState(newState);
  }

  componentDidMount = async () => {
    const requestEntriesAction = {
      type: entryActionTypes.REQUEST_NEXT_ENTRY,
      direction: null
    };
    this.requestEntriesCount();
    this.customReducer(requestEntriesAction);

    let hasVisited = await caches.open("v1").then(async cache => {
      return cache.match("hasVisited");
    });

    if (!hasVisited) this.setState({ showAboutModal: true });
  };

  loadEntries = async (filters, start, end) => {
    let q = await firestore.collection("entries");
    q = q.orderBy("date", "desc");

    if (!start && !end) {
      q = q.limit(this.state.entriesPerPage);
    } else if (start && !end) {
      q = q.startAfter(start);
      q = q.limit(this.state.entriesPerPage);
    } else {
      /* Note: This case may never get used... */
      q = q.startAt(start);
      q = q.endBefore(end);
    }

    const defaultOffs = [
      /*"projects",*/
      "certifications",
      "publications",
      "work"
    ];

    // Remove entries that are "off" by default from the query
    defaultOffs.map(type => {
      if (this.state.activeFilters.includes(type)) return;
      q = q.where(`types.${type}`, "==", false);
    });

    // Add a filter to the query for active entries if one is selected
    if (filters) {
      filters.map(type => {
        q = q.where(`types.${type}`, "==", true);
      });
    }

    q.get()
      .then(snapshot => {
        const successAction = {
          type: entryActionTypes.ENTRIES_LOADED,
          snapshot
        };
        this.customReducer(successAction);
      })
      .catch(err => {
        const errorAction = {
          type: entryActionTypes.ENTRIES_FAILED,
          err
        };
        this.customReducer(errorAction);
      });
  };

  handleGetEntriesCountResult = res => {
    const { entriesPerPage } = this.state;
    const count = res.data.count;
    this.setState({ nPages: Math.round(count / entriesPerPage) });
  };

  requestEntriesCount = (types = null) => {
    // console.log("requesting count of type: " + types);
    getEntriesCount({ types: types })
      .then(res => {
        this.handleGetEntriesCountResult(res);
      })
      .catch(e => {
        console.error("POOOOOOOO!!!!!!!");
        console.log(e);
      });
  };

  showAbout = () => {
    this.setState({ showAboutModal: true, showMenuModal: false });
  };

  hideAbout = () => {
    this.setState({ showAboutModal: false, showMenuModal: false });
  };

  showMenu = () => {
    this.setState({ showAboutModal: false, showMenuModal: true });
  };

  hideMenu = () => {
    this.setState({ showAboutModal: false, showMenuModal: false });
  };

  next = () => {
    const loadAction = {
      type: entryActionTypes.REQUEST_NEXT_ENTRY
    };
    this.customReducer(loadAction);
  };

  prev = () => {
    const loadAction = {
      type: entryActionTypes.GET_PREV_ENTRIES
    };
    this.customReducer(loadAction);
  };

  addFilter = type => {
    // console.log(`Adding ${type}`);
    const action = {
      type: entryActionTypes.FILTER_APPLIED,
      typeToAdd: type
    };

    this.customReducer(action);
  };

  removeFilter = type => {
    // console.log(`Removing ${type}`);
    const action = {
      type: entryActionTypes.FILTER_REMOVED,
      typeToRemove: type
    };

    this.customReducer(action);
  };

  render() {
    const {
      activeFilters,
      entries,
      loading,
      nPages,
      page,
      showAboutModal,
      showMenuModal
    } = this.state;

    const carouselProps = {
      nPages,
      next: this.next,
      page,
      prev: this.prev
    };

    const aboutModalProps = {
      close: this.hideAbout
    };

    const mainMenuProps = {
      about: this.showAbout,
      activeFilters,
      addFilter: this.addFilter,
      close: this.hideMenu,
      removeFilter: this.removeFilter,
      types
    };

    return (
      <div>
        {showAboutModal && (
          <Modal>
            <AboutModal {...aboutModalProps} />
          </Modal>
        )}

        {showMenuModal && (
          <Modal>
            <MainMenu {...mainMenuProps} />
          </Modal>
        )}

        <MenuButton showMenu={this.showMenu} />

        {loading && <Loading />}

        {!loading && entries.length && (
          <EntriesContainer>
            {entries.map((entry, i) => (
              <Entry key={`entry-${i}`} entry={entry} />
            ))}
          </EntriesContainer>
        )}

        {!loading && <PaginationCarousel {...carouselProps} />}
      </div>
    );
  }
}

export default MainView;

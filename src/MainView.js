import React from "react";
// import Entry from "./Entry";
import Loading from "./Loading";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";
import { getEntriesCount, firestore } from "./authentication/firebase";

const entryActionTypes = Object.freeze({
  ENTRIES_FAILED: "ENTRIES_FAILED",
  ENTRIES_LOADED: "ENTRIES_LOADED",
  ENTRIES_REQUESTED: "ENTRIES_REQUESTED",
  FILTER_APPLIED: "FILTER_APPLIED",
  FILTER_REMOVED: "FILTER_REMOVED"
});

const initialState = {
  activeFilters: [],
  entries: [],
  entriesPerPage: 1, // TODO: Make this screen size dependant
  loading: true,
  nPages: null,
  page: null,
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

    if (action.type === entryActionTypes.ENTRIES_LOADED) {
      console.log("A request for more entries just returned");

      if (!action.snapshot || action.snapshot.empty) {
        // TODO: This is an error :/ handle it!
      } else {
        const entries = action.snapshot.docs.map(doc => doc.data());
        newState.entries = entries;
        newState.startAfter = action.snapshot.docs[action.snapshot.size - 1];
        newState.endBefore = action.snapshot.docs[0];
        newState.loading = false;
      }
    }

    if (action.type === entryActionTypes.ENTRIES_REQUESTED) {
      console.log("A request for more entries has been made");

      let endBefore = null,
        startAfter = null;

      if (!newState.page) newState.page = 1;

      if (action && action.direction === "next") {
        newState.page++;
        startAfter = newState.startAfter;
      }

      if (action && action.direction === "prev") {
        newState.page--;
        endBefore = newState.endBefore;
      }

      newState.loading = true;

      this.loadEntries(filters, endBefore, startAfter);
    }

    if (action.type === entryActionTypes.FILTER_APPLIED) {
      console.log("A new filter was added to the list");
    }
    if (action.type === entryActionTypes.FILTER_REMOVED) {
      console.log("A filter type was removed from the list");
    }

    this.setState(newState);
  }

  componentDidMount = async () => {
    const requestEntriesAction = {
      type: entryActionTypes.ENTRIES_REQUESTED,
      direction: null
    };
    this.requestEntriesCount();

    this.customReducer(requestEntriesAction);
  };

  loadEntries = async (filters, endBefore, startAfter) => {
    // this.setState({ loading: true });

    let q = await firestore.collection("entries");
    q = q.orderBy("date", "desc");
    q = q.limit(this.state.entriesPerPage);

    if (endBefore) q = q.endBefore(endBefore);
    if (startAfter) q = q.startAfter(startAfter);

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
    console.log("IT RETURNED!!!");
    console.log(res);
  };

  requestEntriesCount = (types = null) => {
    getEntriesCount({
      types
      // "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    })
      .then(res => {
        this.handleGetEntriesCountResult(res);
      })
      .catch((e, res) => {
        console.error("POOOOOOOO!!!!!!!");
        console.log(e);
        console.log(res);
      });
  };

  showMenu = () => {
    this.setState({ showMenuModal: true });
  };

  hideMenu = () => {
    this.setState({ showMenuModal: false });
  };

  next = () => {
    const loadAction = {
      type: entryActionTypes.ENTRIES_REQUESTED,
      direction: "next"
    };
    this.customReducer(loadAction);
  };

  prev = () => {
    const loadAction = {
      type: entryActionTypes.ENTRIES_REQUESTED,
      direction: "prev"
    };
    this.customReducer(loadAction);
  };

  render() {
    const { loading, nPages, page, showMenuModal } = this.state;

    const carouselProps = {
      nPages,
      next: this.next,
      page,
      prev: this.prev
    };

    return (
      <div>
        {showMenuModal && (
          <Modal>
            <MainMenu close={this.hideMenu} />
          </Modal>
        )}

        <MenuButton showMenu={this.showMenu} />

        {loading && <Loading />}

        {/* {<Entry />} */}

        {!loading && <PaginationCarousel {...carouselProps} />}
      </div>
    );
  }
}

export default MainView;

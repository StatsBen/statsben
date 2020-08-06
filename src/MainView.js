import React from "react";
// import Entry from "./Entry";
import Loading from "./Loading";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";
import { firestore } from "./authentication/firebase";

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
  limit: 2,
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

    switch (action.type) {
      case entryActionTypes.ENTRIES_FAILED:
        console.log("A request for more entries failed!");
        console.error("Firestore error!");
        console.error(action.err);
        // TODO: show an error modal instead?
        break;

      case entryActionTypes.ENTRIES_LOADED:
        console.log("A request for more entries just returned");

        if (!action.snapshot || action.snapshot.empty) {
          // TODO: This is an error :/ handle it!
        } else {
          newState.entries = action.snapshot.docs.map(doc => doc.data());
          newState.loading = false;
        }

        break;

      case entryActionTypes.ENTRIES_REQUESTED:
        console.log("A request for more entries has been made");

        newState.loading = true;

        this.loadEntries(filters);

        break;
      case entryActionTypes.FILTER_APPLIED:
        console.log("A new filter was added to the list");
        break;
      case entryActionTypes.FILTER_REMOVED:
        console.log("A filter type was removed from the list");
        break;
      default:
        console.log("Custom reducer was called with an unknown action type...");
    }

    this.setState(newState);
  }

  componentDidMount = async () => {
    const requestEntriesAction = {
      type: entryActionTypes.ENTRIES_REQUESTED
    };

    this.customReducer(requestEntriesAction);
  };

  loadEntries = async filters => {
    // this.setState({ loading: true });

    let q = await firestore.collection("entries");
    q = q.orderBy("date", "desc");
    q = q.limit(this.state.limit);

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

  showMenu = () => {
    this.setState({ showMenuModal: true });
  };

  hideMenu = () => {
    this.setState({ showMenuModal: false });
  };

  render() {
    const { loading, showMenuModal } = this.state;

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

        {!loading && <PaginationCarousel />}
      </div>
    );
  }
}

export default MainView;

import React from "react";
// import Entry from "./Entry";
import Loading from "./Loading";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";
import { firestore } from "./authentication/firebase";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: [],
      entries: [],
      limit: 2,
      loading: true,
      showMenuModal: false
    };
  }

  componentDidMount = async () => {
    this.loadEntries();
  };

  handleLoadingSuccess = snapshot => {
    if (snapshot.empty) {
      this.setState({
        entries: [],
        loading: false,
        noEntries: true
      });
    } else {
      const entries = snapshot.docs.map(doc => doc.data());
      this.setState(state => ({
        entries: [...state.entries, ...entries],
        loading: false
      }));
    }
  };

  loadEntries = async () => {
    this.setState({ loading: true });

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
    if (this.state.activeFilters.length) {
      this.state.activeFilters.map(type => {
        q = q.where(`types.${type}`, "==", true);
      });
    }

    q.get()
      .then(this.handleLoadingSuccess)
      .catch(err => {
        console.error("Firestore error!");
        console.error(err);
        // TODO: show an error modal instead?
        this.setState({ loading: true });
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

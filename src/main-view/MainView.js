import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import WelcomeBanner from "./welcome-banner/WelcomeBanner";
import Menu from "./static-menu/Menu";
import Header from "./Header";
import Footer from "./footer/Footer";
// import LoadingMessage from "./LoadingMessage";
import LoadMoreButton from "./LoadMoreButton";
import NoEntries from "./NoEntries";
import SmartColumns from "./SmartColumns";
import { firestore } from "../authentication/firebase";
import { globals } from "../globals";

const containerCSS = css`
  float: none;
  width: calc(100% - 8em);
  margin-left: 8em;
  padding-bottom: 300px;
  min-height: ${window.innerHeight + "px"};
`;

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

  loadEntries = async (backToTop = false) => {
    this.setState({ loading: true });

    let q = await firestore.collection("entries");

    if (this.state.alreadyLoaded) {
      q = q.orderBy("date", "desc");
      q = q.startAfter(this.state.alreadyLoaded);
      q = q.limit(this.state.limit);
    } else {
      q = q.orderBy("date", "desc");
      q = q.limit(this.state.limit);
    }

    // console.log("active filters are: ");
    // console.log(this.state.activeFilters);
    // console.log("length: " + this.state.activeFilters.length);

    const defaultOffs = [
      /*"projects",*/
      "certifications",
      "publications",
      "work"
    ];

    defaultOffs.map(type => {
      if (this.state.activeFilters.includes(type)) return;
      q = q.where(`types.${type}`, "==", false);
    });

    if (this.state.activeFilters.length) {
      this.state.activeFilters.map(type => {
        q = q.where(`types.${type}`, "==", true);
      });
    }

    q.get()
      .then(snapshot => {
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

        if (backToTop === true) this.scrollToTop(null);
      })
      .catch(err => {
        console.error("Firestore error!");
        console.error(err);
        // alert("Uh oh! Something just broke... please reload the page.");
      });
  };

  scrollToTop = event => {
    if (event) event.preventDefault();
    const top = 0; //window.innerHeight - 150;
    window.scrollTo(0, top);
  };

  addTypeFilter = event => {
    event.preventDefault();
    const type = event.target.innerHTML;

    this.setState(
      {
        activeFilters: [type],
        entries: [],
        alreadyLoaded: null,
        loading: true,
        noEntries: false
      },
      () => {
        this.loadEntries(true);
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
        this.loadEntries(true);
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
      <div css={containerCSS}>
        <Header />

        {/* Show message if query returns empty snapshot... */}
        {noEntries ? <NoEntries /> : null}

        {/* Show loading component if state is loading */}
        {/* {loading ? <LoadingMessage /> : null} */}

        <div>
          <div id="content-container">
            <SmartColumns {...entries} />
          </div>
          <Menu
            addType={this.addTypeFilter}
            removeType={this.removeTypeFilter}
            activeFilters={activeFilters}
            types={types}
            scrollToTop={this.scrollToTop}
          />
        </div>
        <LoadMoreButton
          active={!loading}
          loadMore={this.loadEntries}
          moreToLoad={moreToLoad}
        />

        <Footer />
      </div>
    );
  }
}

export default MainView;

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import AdminPortal from "./admin-portal/AdminPortal";
import EntriesView from "./entries-view/EntriesView";
import FullPageEntry from "./full-page-entry/FullPageEntry";
import Footer from "./footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <Router>
          <EntriesView path="/" />
          <AdminPortal path="/admin" />
          <FullPageEntry path="/entry/:id" />
        </Router>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

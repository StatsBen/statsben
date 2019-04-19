import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import NavBar from "./nav-bar/NavBar";
import AdminPortal from "./admin-portal/AdminPortal";
import EntriesView from "./entries-view/EntriesView";
import Footer from "./footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <NavBar />
        <Router>
          <EntriesView path="/" />
          <AdminPortal path="/admin" />
        </Router>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

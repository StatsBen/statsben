import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import NavBar from "./nav-bar/NavBar.jsx";
import FiltrationStation from "./filtration-station/FiltrationStation.jsx";
import AdminPortal from "./admin-portal/AdminPortal.jsx";
import EntriesView from "./entries-view/EntriesView.jsx";

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <NavBar />
        <FiltrationStation />
        <Router>
          <EntriesView path="/" />
          <AdminPortal path="/admin/" />
        </Router>
        <h1>Well, at least React is working!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

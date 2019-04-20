import React from "react";
import NavBar from "../nav-bar/NavBar";

class EntriesView extends React.Component {
  render() {
    return (
      <div id="entries-container">
        <NavBar />
        <div id="featured-entries" />
        <div id="normal-entries" />
        <h1> Test, yep the entries will appear here!</h1>
      </div>
    );
  }
}

export default EntriesView;

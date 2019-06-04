import React from "react";
import Entry from "./Entry";
import "./entries.css";

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null };
  }

  render() {
    let entries = null;
    if (this.props.entries) {
      entries = this.props.entries.map((entry, i) => {
        return <Entry key={`entry-${i}`} entry={entry} />;
      });
    }

    return (
      <div id="entries-container">
        {entries}
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default Entries;

import React from "react";
import PropTypes from "prop-types";
import "./other-entries.css";

class OtherEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null };
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    let entries = null;
    if (this.props.entries) {
      entries = this.props.entries.map((entry, i) => {
        return (
          <div key={`entry-${i}`}>
            <h3>{entry.Name}</h3>
          </div>
        );
      });
    }

    return (
      <div>
        <h2>Other</h2>
        {entries}
      </div>
    );
  }
}

export default OtherEntries;

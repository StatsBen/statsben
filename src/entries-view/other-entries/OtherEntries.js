import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
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
          <div key={`entry-${i}`} className={`other-entry-container`}>
            <div className={`entry-date`}>
              <span>
                {moment(entry.Date, "MM/DD/YY").format("MM - DD - YY")}
              </span>
            </div>
            <div className={`entry-right`}>
              <div className={`entry-title`}>
                <h3>{entry.Name}</h3>
              </div>
              <div
                className={`entry-contents`}
                dangerouslySetInnerHTML={{ __html: entry.html }}
              />
            </div>
          </div>
        );
      });
    }

    return (
      <div id="other-entries-container">
        {entries}
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default OtherEntries;

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
          <div key={`entry-${i}`}>
            <h3 className={`entry-title`}>{entry.Name}</h3>
            <div className={`entry-date`}>
              <span>
                {moment(entry.Date, "MM/DD/YY").format("MMM Do YYYY")}
              </span>
            </div>
            <div
              className={`entry-contents`}
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          </div>
        );
      });
    }

    return <div>{entries}</div>;
  }
}

export default OtherEntries;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import "./featured-entries.css";

class FeaturedEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null };
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    let entries = null;
    let c = "featured-entry-";

    if (this.props.entries) {
      entries = this.props.entries.map((entry, i) => {
        return (
          <Link key={`entry-link-${i}`} to="/entry/123">
            <div className="featured-entry" key={`entry-${i}`}>
              <span className={`${c}name`}>{entry.Name}</span>
              <span className={`${c}date`}>{entry.date}</span>
              {entry["Featured Photo"] ? (
                <img
                  className={`${c}-img`}
                  alt={entry.Name}
                  src={entry["Featured Photo"]}
                />
              ) : null}
            </div>
          </Link>
        );
      });
    }

    return (
      <div id="featured-entries">
        <h2>Featured</h2>
        {entries}
      </div>
    );
  }
}

export default FeaturedEntries;

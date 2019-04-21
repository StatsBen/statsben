import React from "react";
import PropTypes from "prop-types";
import "./featured-entries.css";

class FeaturedEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    return <div>Featured</div>;
  }
}

export default FeaturedEntries;

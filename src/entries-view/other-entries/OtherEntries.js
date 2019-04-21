import React from "react";
import PropTypes from "prop-types";
import "./other-entries.css";

class OtherEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    return <div>{this.props.entries}</div>;
  }
}

export default OtherEntries;

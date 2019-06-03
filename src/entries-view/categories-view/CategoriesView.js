import React from "react";
import PropTypes from "prop-types";
import "./categories-view.css";

class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: null };
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    return <div />;
  }
}

export default CategoriesView;

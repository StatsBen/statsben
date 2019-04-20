import React from "react";
import PropTypes from "prop-types";

class EditableEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry,
      loadEntry: props.loadEntry,
      popupIsVisible: false
    };
  }

  static propTypes = {
    entry: PropTypes.object,
    loadEntry: PropTypes.func
  };

  handleKeypress = event => {
    if (event.which == 13) {
      this.setState({ popupIsVisible: !this.state.popupIsVisible });
    }
  };

  handleClick = () => {
    this.setState({ popupIsVisible: !this.state.popupIsVisible });
  };

  editEntry = () => {
    this.state.loadEntry(this.state.entry);
  };

  render() {
    let popup = null;

    if (this.state.popupIsVisible) {
      popup = (
        <div id="pop-up-container">
          <button onClick={this.editEntry}>Edit</button>
          <button>Delete</button>
        </div>
      );
    }

    return (
      <div
        className="entry"
        role="button"
        onClick={this.handleClick}
        onKeyPress={this.handleKeypress}
        tabIndex={0}
      >
        {popup}
        <span>Name: {this.props.entry.Name}&nbsp;</span>
        <span>Date: {this.props.entry.Date}</span>
      </div>
    );
  }
}

export default EditableEntry;

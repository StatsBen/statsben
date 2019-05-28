import React from "react";
import PropTypes from "prop-types";

class EditableEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry,
      loadEntry: props.loadEntry,
      deleteEntry: props.deleteEntry,
      popupIsVisible: false
    };
  }

  static propTypes = {
    entry: PropTypes.object,
    loadEntry: PropTypes.func,
    deleteEntry: PropTypes.func
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

  deleteEntry = () => {
    this.state.deleteEntry(this.state.entry.Name);
  };

  render() {
    let popup = null;

    if (this.state.popupIsVisible) {
      popup = (
        <div id="pop-up-container">
          <button onClick={this.editEntry}>Edit</button>
          <button onClick={this.deleteEntry}>Delete</button>
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
        <span>Date: {this.props.entry.Date.toString()}</span>
      </div>
    );
  }
}

export default EditableEntry;

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

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
        <div>
          <span>
            <strong>Name</strong>: {this.props.entry.Name}&nbsp;
          </span>
        </div>
        <div>
          <span>
            <strong>Date</strong>:{" "}
            {moment(this.props.entry.Date).format("MMM Do YYYY")}
          </span>
        </div>
        <div>
          <span>
            <strong>Featured</strong>:{" "}
            {this.props.entry.isFeatured ? `Yes` : `No`}
          </span>
        </div>
        {this.props.entry.tags.map(tag => {
          return (
            <div key={`editable-entry-tag-${tag.name}`}>
              <span>
                <strong>{tag.name}</strong>: {tag.value}
              </span>
            </div>
          );
        })}
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default EditableEntry;

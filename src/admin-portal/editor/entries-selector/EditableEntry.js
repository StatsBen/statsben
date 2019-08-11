import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { globals } from "../../../globals";
import EditableEntryPopUp from "./EditableEntryPopUp";

class EditableEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry,
      popupIsVisible: false
    };
  }

  handleKeypress = event => {
    if (event.which == 13) {
      this.handleClick();
    }
  };

  handleClick = () => {
    this.setState(state => {
      return { popupIsVisible: !state.popupIsVisible };
    });
  };

  editEntry = () => {
    this.props.loadEntry(this.state.entry);
  };

  deleteEntry = () => {
    this.props.deleteEntry(this.state.entry.name);
  };

  render() {
    let { popupIsVisible, entry } = this.state;

    let date = null;
    try {
      date = moment(entry.date.toDate()).format("MM/DD/YY");
    } catch (e) {
      //Just leave it
    }

    return (
      <div
        role="button"
        onClick={this.handleClick}
        onKeyPress={this.handleKeypress}
        tabIndex={0}
        css={css`
          float: left;
          margin: 20px;
          padding: 10px;
          background: ${globals.colours.lightBlue};
          border: thin solid ${globals.colours.lightGray};
          border-radius: ${globals.sizes.borderRadius};
          user-select: none;
          cursor: pointer;
          color: ${globals.colours.charcoal};
          &:hover {
            background: white;
          }
        `}
      >
        {popupIsVisible ? (
          <EditableEntryPopUp edit={this.editEntry} delete={this.deleteEntry} />
        ) : null}
        <div>
          <span>
            <strong>Name</strong>: {entry.name}&nbsp;
          </span>
        </div>
        <div>
          <span>
            <strong>Date</strong>: {date}
          </span>
        </div>

        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default EditableEntry;

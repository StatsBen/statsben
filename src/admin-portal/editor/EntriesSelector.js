import React from "react";
import PropTypes from "prop-types";
import EditableEntry from "./EditableEntry";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedEntry: null };
  }

  // LOL such helpful prop types...
  static propTypes = {
    entries: PropTypes.array,
    user: PropTypes.object,
    loadEntry: PropTypes.func,
    deleteEntry: PropTypes.func
  };

  handleKeySelect = event => {
    if (event.which == 13) {
      this.selectEntry();
    }
  };

  deleteEntry = () => {};

  render() {
    const { entries } = this.props;
    if (!entries) {
      return <div />;
    } else {
      return (
        <div id="entries-container">
          <h2>Entries</h2>
          {entries.map((entry, i) => {
            return (
              <EditableEntry
                loadEntry={this.props.loadEntry}
                deleteEntry={this.props.deleteEntry}
                entry={entry}
                key={
                  entry.Name == ""
                    ? `un-named-entry-${i}`
                    : `entry-${entry.name}-${i}`
                }
              />
            );
          })}
        </div>
      );
    }
  }
}

export default EntryEditor;

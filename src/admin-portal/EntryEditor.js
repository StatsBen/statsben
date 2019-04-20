import React from "react";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  // LOL such helpful prop types...
  propTypes = {
    entries: Object,
    user: Object
  };

  handleKeySelect = event => {
    if (event.which == 13) {
      this.selectEntry();
    }
  };

  selectEntry = event => {
    event.target.classList.add("selected");
  };

  deleteEntry = () => {};

  editEntry = () => {};

  render() {
    // const { entries, user } = this.state;
    const { entries } = this.props;
    if (!entries) {
      return <div />;
    } else {
      return (
        <div id="entries-container">
          <h2>Entries</h2>
          {entries.map((entry, i) => {
            return (
              <div
                key={
                  entry.name == ""
                    ? `un-named-entry-${i}`
                    : `entry-${entry.name}-${i}`
                }
                className="entry"
                role="button"
                tabIndex={0}
                onClick={this.selectEntry}
                onKeyPress={this.handleKeySelect}
              >
                <span className="entry-name">{entry.name}</span>
                <span className="entry-date">{entry.date}</span>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default EntryEditor;

import React from "react";
import EditableEntry from "./EditableEntry";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries } = this.props;
    if (!entries) {
      return <div />;
    } else {
      return (
        <div
          css={css`
            float: none;
            clear: both;
            width: 90%;
            margin: 50px 0 30px 0;
            padding: 50px 5% 50px 5%;
          `}
        >
          <h2>Existing Entries:</h2>
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

          <div style={{ float: "none", clear: "both", width: "100%" }} />
        </div>
      );
    }
  }
}

export default EntryEditor;

import React from "react";

class DetailsEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  // make a single-line text entry element
  generateTextBox = (label, value, i) => {
    return (
      <div key={`${label}-${i}`} className="entry-attribute-form-element">
        <label htmlFor={label}>{`${label}: `}</label>
        <input
          type="text"
          name={label}
          value={value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  };

  generateToggleButton = (label, value, i) => {
    return (
      <div key={`${label}-${i}`} className="entry-attribute-form-element">
        <label htmlFor={label}>{`${label}: `}</label>
        <input
          type="checkbox"
          name={label}
          checked={value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  };

  render() {
    const { currentEntry } = this.props;

    return (
      <div id="entry-details" className="editor-section">
        {Object.entries(currentEntry).map((attr, i) => {
          switch (attr[0]) {
            case "html":
              return;
            case "tags":
              return;
            case "Is Featured":
              return this.generateToggleButton(attr[0], attr[1], i);
            case "Show By Default":
              return this.generateToggleButton(attr[0], attr[1], i);
            default:
              return this.generateTextBox(attr[0], attr[1], i);
          }
        })}
        <div
          style={{
            position: "relative",
            float: "none",
            clear: "both",
            width: "100%"
          }}
        />
      </div>
    );
  }
}

export default DetailsEditor;
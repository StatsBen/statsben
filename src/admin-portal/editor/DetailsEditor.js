import React from "react";
import PropTypes from "prop-types";

class DetailsEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    currentEntry: PropTypes.object,
    revising: PropTypes.bool,
    resetWriter: PropTypes.func,
    handleChange: PropTypes.func,
    submitNewEntry: PropTypes.func,
    updateEntry: PropTypes.func,
    setIsFeatured: PropTypes.func
  };

  // make a single-line text entry element
  generateTextBox = (label, value, i) => {
    return (
      <div key={`${label}-${i}`} className="entry-attribute-form-element">
        <label htmlFor={label}>{label}</label>
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
        <label htmlFor={label}>{label}</label>
        <input
          type="checkbox"
          name={label}
          checked={value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  };

  generateContentArea = (label, value, i) => {
    return (
      <div key={`${label}-${i}`} className="entry-attribute-form-element">
        <label htmlFor={label}>{label}</label>
        <input
          type="textarea"
          rows="100"
          cols="200"
          name={label}
          value={value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  };

  // make a radio-checkbox element

  render() {
    const { currentEntry } = this.props;

    return (
      <div id="writing-box">
        <form>
          {Object.entries(currentEntry).map((attr, i) => {
            switch (attr[0]) {
              case "Contents":
                return this.generateContentArea(attr[0], attr[1], i);
              case "Is Featured":
                return this.generateToggleButton(attr[0], attr[1], i);
              default:
                return this.generateTextBox(attr[0], attr[1], i);
            }
          })}
        </form>
      </div>
    );
  }
}

export default DetailsEditor;

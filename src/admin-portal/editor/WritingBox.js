import React from "react";
import PropTypes from "prop-types";

class WritingBox extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    currentEntry: PropTypes.object,
    resetWriter: PropTypes.func,
    handleChange: PropTypes.func,
    submitNewEntry: PropTypes.func,
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
        <h1>Make an Entry</h1>
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

          <input
            onClick={this.props.submitNewEntry}
            name="finish-button"
            type="submit"
            value="Commit"
          />
        </form>
      </div>
    );
  }
}

export default WritingBox;

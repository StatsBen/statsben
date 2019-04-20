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
    submitNewEntry: PropTypes.func
  };

  render() {
    const { currentEntry } = this.props;

    return (
      <div id="writing-box">
        <h1>Make an Entry</h1>
        <form>
          {Object.entries(currentEntry).map((attr, i) => {
            let label = attr[0];
            let value = attr[1];

            return (
              <div
                key={`${label}-${i}`}
                className="entry-attribute-form-element"
              >
                <label htmlFor={label}>{label}</label>
                <input
                  type="text"
                  name={label}
                  value={value}
                  onChange={this.props.handleChange}
                />
              </div>
            );
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

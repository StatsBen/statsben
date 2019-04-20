import React from "react";
import { firestore } from "../authentication/firebase";

class WritingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryAttributes: [
        "name",
        "date",
        "grade",
        "types",
        "color",
        "theme",
        "featured-text",
        "featured-photo"
      ]
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitNewEntry = event => {
    event.preventDefault();
    const newEntry = {};
    this.state.entryAttributes.map(attr => {
      newEntry[attr] = this.state[attr] ? this.state[attr] : "";
    });
    firestore.collection("entries").add(newEntry);
  };

  render() {
    return (
      <div id="writing-box">
        <h1>Make an Entry</h1>
        <form>
          {this.state.entryAttributes.map((attr, i) => {
            let labelCase = attr.toLowerCase().replace(" ", "-");

            return (
              <div
                key={`${labelCase}-${i}`}
                className="entry-attribute-form-element"
              >
                <label htmlFor={labelCase}>{attr}</label>
                <input
                  type="text"
                  name={labelCase}
                  onChange={this.handleChange}
                />
              </div>
            );
          })}

          <div className="entry-property-enty">
            <label htmlFor="is-featured">Featured:</label>
            <input name="is-featured" type="checkbox" />
          </div>

          <div name="contents" className="entry-property-enty">
            <span>Contents:</span> <br />
            <textarea type="text" />
          </div>

          <input
            onClick={this.submitNewEntry}
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

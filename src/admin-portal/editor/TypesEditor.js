import React from "react";
import { globals } from "../../globals/";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class TypesEditor extends React.Component {
  constructor(props) {
    super(props);

    let types = [];

    globals.categories.map(type => {
      types.push({ name: type, checked: false });
    });

    this.state = { types };
  }

  /** Converts the array of types into an object with names for keys
      so it'll store better in the database! **/
  getTypesObjectInRightFormat() {
    let formattedObj = {};
    this.state.types.map(type => {
      formattedObj[type.name] = type.checked;
    });
    return formattedObj;
  }

  handleChange = event => {
    let val = event.target.checked;
    let name = event.target.name.substring(6);
    let newTypes = [];
    this.state.types.map(type => {
      let newType = {
        name: type.name,
        checked: name == type.name ? val : type.checked
      };
      newTypes.push(newType);
    });

    this.setState({ types: newTypes });

    /** Convert it to the right format, and pass it to the parent **/
    let obj = this.getTypesObjectInRightFormat();
    this.props.handleChange(obj);
  };

  render() {
    return (
      <div id="entry-grades" className="editor-section">
        <h3>Categories</h3>
        {this.state.types.map(type => {
          let name = type.name;
          return (
            <div key={`checkbox-for-${name}`}>
              <input
                name={`input-${name}`}
                type="checkbox"
                onChange={this.handleChange}
                checked={type.checked}
              />
              <label
                htmlFor={`input-${name}`}
                css={css`
                  margin-left: 5px;
                `}
              >
                {name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TypesEditor;

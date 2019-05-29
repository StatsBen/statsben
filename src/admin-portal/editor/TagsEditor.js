import React from "react";

class TagsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addTag = event => {
    // Add a tag
  };

  editTag = tag => {};

  removeTag = tag => {};

  openEditPopUp = event => {};

  render() {
    return (
      <div id="tags-editor" className="editor-section">
        <div id="add-sub-form">
          <h3>Tags Editor</h3>
          <label htmlFor="tag-name">Tag Name: </label>
          <input name="tag-name" type="text" />
          <label htmlFor="tag-value">Tag Value: </label>
          <input name="tag-value" type="text" />
          <input
            name="add-button"
            type="submit"
            value="Add"
            onClick={this.addTag}
          />
        </div>
        <div id="added-tags">
          {this.props.tags.map(tag => {
            return (
              <p id="added-tag" key={`tag-${tag.name}`}>
                <span className="tag-name">{tag.name}</span>
                <span className="tag-value">{tag.value}</span>
                <button onClick={this.openEditPopUp}>Edit</button>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TagsEditor;

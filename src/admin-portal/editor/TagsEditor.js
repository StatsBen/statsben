import React from "react";

class TagsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "", value: "" };
    this.state.tags = props.tags.map(tag => {
      tag.display = "none";
    });
  }

  handleChange = event => {
    let name = event.target.getAttribute("name");
    let val = event.target.value;
    if (name === "tag-name") {
      this.setState({ name: val });
    } else if (name === "tag-value") {
      this.setState({ value: val });
    } else {
      // Hmmm... probably throw an error or something?
    }
  };

  handleAdd = event => {
    // Add a tag
    event.preventDefault();
    let tag = { name: this.state.name, value: this.state.value };
    this.props.addTag(tag);
    this.setState({ name: "", value: "" });
  };

  // editTag = tag => {};

  // removeTag = tag => {};

  buildPoopUpForTag(tag) {
    let name = tag.name;
    let value = tag.value;

    let edit = event => {
      event.preventDefault();
      // TODO Remove this tag from the list of tags
      this.props.removeTag(tag);
      this.setState({ name, value });
      event.target.parentElement.style.display = "none";
    };

    let close = event => {
      event.preventDefault();
      event.target.parentElement.style.display = "none";
    };

    let kill = event => {
      event.preventDefault();
      // TODO Remove this tag from the list of tags
      this.props.removeTag(tag);
      event.target.parentElement.style.display = "none";
    };

    let poopUp = (
      <div
        id={`tag-edit-pop-up-${name}`}
        style={{
          display: "none",
          position: "absolute",
          width: "80px",
          height: "20px",
          left: this.state.x,
          top: this.state.y
        }}
      >
        <span>{`Edit ${name}?`}</span>
        <br />
        <button onClick={edit}>Edit</button>
        <button onClick={close}>Nah, NVM...</button>
        <button onClick={kill}>Delete</button>
      </div>
    );

    return poopUp;
  }

  buildTagElement(tag) {
    const poopUp = this.buildPoopUpForTag(tag);

    let handleEdit = event => {
      event.preventDefault();
      let popper = document.getElementById(`tag-edit-pop-up-${tag.name}`);
      popper.style.display = "block";
    };

    return (
      <div id="added-tag" key={`tag-${tag.name}`}>
        {poopUp}
        <span className="tag-name">{tag.name}</span>
        <span> : </span>
        <span className="tag-value">{tag.value}</span>
        <button onClick={handleEdit}>Edit</button>
      </div>
    );
  }

  render() {
    return (
      <div id="tags-editor" className="editor-section">
        <div id="add-sub-form">
          <h3>Tags Editor</h3>
          <label htmlFor="tag-name">Tag Name: </label>
          <input
            name="tag-name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="tag-value">Tag Value: </label>
          <input
            name="tag-value"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleAdd}>Add</button>
        </div>

        {
          <div id="added-tags">
            {this.props.tags.map(tag => {
              return this.buildTagElement(tag);
            })}
          </div>
        }
      </div>
    );
  }
}

export default TagsEditor;

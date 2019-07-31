import React from "react";

class HTMLWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateHTML = event => {
    this.props.handleChange(event);
    const target = event.target;
    const value = target.value;
    document.getElementById("html-preview").innerHTML = value;
  };

  componentDidMount() {}

  render() {
    return (
      <div id="html-editor" className="editor-section">
        <div
          id="html-left-pane"
          className="entry-attribute-form-element html-pane"
        >
          <label htmlFor="html">Content Editor</label>
          <textarea
            id="html-text-input"
            name="html"
            type="textarea"
            onChange={this.updateHTML}
            value={this.props.contents}
          />
        </div>
        <div
          id="html-right-pane"
          className="entry-attribute-form-element html-pane"
        >
          <span id="html-preview" />
        </div>
        <div id="clearfix" style={{ clear: "both", width: "100%" }}>
          {" "}
        </div>
      </div>
    );
  }
}

export default HTMLWriter;

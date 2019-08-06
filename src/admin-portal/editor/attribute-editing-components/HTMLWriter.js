import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import ImageUploader from "./ImageUploader";
import { globals } from "../../../globals";

const containerCSS = css`
  display: block;
  position: relative;
  float: none;
  clear: both;
  width: 90%;
  margin: 50px 0 50px 0;
  padding: 0 5% 50px 5%;
  border-bottom: thin solid ${globals.colours.fadedDark};
`;

const EntryPane = props => {
  return (
    <div
      css={css`
        display: block;
        position: relative;
        float: left;
        width: 46%;
        margin: 20px 10px 10px 10px;
        background: white;
        padding: 5px;
        border-radius: 5px !important;
        border: thin solid #aaaaaa;
        box-shadow: -2px 2px 5px #cccccc;
      `}
    >
      {props.children}
    </div>
  );
};

const PreviewPane = () => {
  return (
    <div
      id="html-right-pane"
      className="entry-attribute-form-element html-pane"
      css={css`
        margin-left: 1%;
      `}
    >
      <span
        id="html-preview"
        css={css`
          display: block;
          position: relative;
          width: 46%;
          height: 190px;
          padding: 2.5%;
          bottom: 0;
          resize: both;
          border: thin solid #777777;
          box-shadow: 0px 0px 5px #aaaaaa;
          margin-top: 1em;
          overflow: scroll;
          background: #ffffff;
        `}
      />
    </div>
  );
};

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
      <div className="editor-section" css={containerCSS}>
        <ImageUploader />
        <EntryPane>
          <label
            htmlFor="html"
            css={css`
              display: block;
              position: relative;
              width: 100%;
              text-align: center;
            `}
          >
            Content Editor
          </label>
          <textarea
            id="html-text-input"
            name="html"
            type="textarea"
            onChange={this.updateHTML}
            value={this.props.contents}
            css={css`
              display: block;
              position: relative;
              width: 99%;
              height: 200px;
              z-index: 99;
              resize: vertical;
            `}
          />
        </EntryPane>
        <PreviewPane />
      </div>
    );
  }
}

export default HTMLWriter;

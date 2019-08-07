import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import ImageUploader from "./ImageUploader";
// import { globals } from "../../../globals";

const containerCSS = css`
  display: block;
  position: relative;
  float: none;
  clear: both;
  width: 100%;
  margin: 20px 0 50px 0;
  padding: 50px 0 50px 0;
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
        @media (max-width: 1000px) {
          width: 95%;
        }
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
          width: 45%;
          height: ${250 - 20 + "px"};
          padding: 2.5%;
          bottom: 0;
          resize: both;
          border: thin solid #777777;
          box-shadow: 0px 0px 5px #aaaaaa;
          margin-top: 1em;
          overflow: scroll;
          background: #ffffff;
          @media (max-width: 1000px) {
            width: 94%;
          }
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
      <div css={containerCSS}>
        <h3
          css={css`
            text-align: left;
          `}
        >
          Edit HTML:
        </h3>
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
            name="input-html"
            type="textarea"
            onChange={this.updateHTML}
            value={this.props.contents ? this.props.contents : ""}
            css={css`
              display: block;
              position: relative;
              width: 99%;
              height: 250px;
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

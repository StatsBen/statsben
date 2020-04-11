import React from "react";
// import EntryContainer from "./EntryContainer";
import EntryContents from "./EntryContents";
import EntryDate from "./EntryDate";
import EntryGrade from "./EntryGrade";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import { globals } from "../globals";

const EntryContainer = props => (
  <div
    css={css`
      position: relative; /* Must be included for absolutely positioned children */
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 90%;
      min-width: 450px;
      height: auto;
      margin: 0px 0 100px 0;
      padding: 0 5% 0 5%;
    `}
  >
    {props.children}
  </div>
);

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry || null,
      loading: true,
      span: 1,
      height: null
    };
  }

  componentDidMount() {
    addCaptionToImgFromAltText(this.element);
  }

  render() {
    let { entry } = this.props;

    return (
      <div ref={r => (this.element = r)}>
        <EntryContainer>
          <EntryGrade gradeObject={entry.grade} />
          <EntryDate date={entry.date} />
          <EntryContents entry={entry} />
        </EntryContainer>
      </div>
    );
  }
}

export default Entry;

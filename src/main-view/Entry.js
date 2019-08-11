import React from "react";
import EntryContainer from "./EntryContainer";
import EntryContents from "./EntryContents";
import EntryDate from "./EntryDate";
import EntryGrade from "./EntryGrade";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";
// import { globals } from "../globals";

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

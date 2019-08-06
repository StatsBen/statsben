import React from "react";
import moment from "moment";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";
// import { css } from "@emotion/core";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: props.entry || null, hidden: true };
  }

  componentDidMount() {
    this.addCaptionToImgFromAltText(this.element);
  }

  // imported from the long-functions directory
  addCaptionToImgFromAltText = addCaptionToImgFromAltText;

  render() {
    let { entry } = this.props;

    return (
      <div className={`entry-container`} ref={r => (this.element = r)}>
        <div className={`entry-date`}>
          <span>
            {moment(entry.dateString, "MM/DD/YY").format("MM - DD - YY")}
          </span>
        </div>
        <div className={`entry-right`}>
          <div className={`entry-title`}>
            <h3>{entry.Name}</h3>
          </div>
          <div
            className={`entry-contents`}
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
        </div>
      </div>
    );
  }
}

export default Entry;

import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: props.entry || null, hidden: true };
  }

  componentDidMount() {
    addCaptionToImgFromAltText(this.element);
  }

  containerCSS = css``;

  render() {
    let { entry } = this.props;

    return (
      <div className={`entry-container`} ref={r => (this.element = r)}>
        <div className={`entry-date`}>
          <span>{moment(entry.date.toDate()).format("MM - DD - YY")}</span>
        </div>
        <div className={`entry-right`}>
          <div className={`entry-title`}>
            <h3>{entry.name}</h3>
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

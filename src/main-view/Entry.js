import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";
import { globals } from "../globals";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: props.entry || null, hidden: true };
  }

  componentDidMount() {
    addCaptionToImgFromAltText(this.element);
  }

  containerCSS = css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    float: left;
    width: 90%;
    min-width: 550px;
    margin: 0px 0 50px 0;
    padding: 0 5% 0 5%;
    @media (min-width: 1400px) {
      width: 95%;
      margin: 0 0 100px 0;
      break-inside: avoid;
      break-after: avoid;
      page-break-inside: avoid;
      padding: 0 2.5% 0 2.5%;
    }
  `;

  outerDateCSS = css`
    order: 1;
    @media (max-width: 1400px) {
      order: 1;
      flex: 0 0 auto;
    }
    @media (min-width: 1400px) {
      flex: 0 0 22px;
    }
  `;

  innerDateCSS = css`
    display: block;
    position: relative;
    padding-left: 25px;
    writing-mode: vertical-lr;
    text-align: right;
    font-family: ${globals.fonts.accent};
    font-size: 14pt;
    text-orientation: mixed;
    transform: rotate(180deg);
    @media (min-width: 1400px) {
      width: 22px;
      min-height: 130px;
    }
  `;

  contentsContainerCSS = css`
    order: 2;
    flex: 0 1 auto;
    padding-left: 5%;
    min-height: 10em;
    border-left: thin solid #bbbbbb;
  `;

  render() {
    let { entry } = this.props;

    return (
      <div css={this.containerCSS} ref={r => (this.element = r)}>
        <div css={this.outerDateCSS}>
          <span css={this.innerDateCSS}>
            {moment(entry.date.toDate()).format("MM - DD - YY")}
          </span>
        </div>
        <div css={this.contentsContainerCSS}>
          <div className={`entry-title`}>
            <h3
              css={css`
                padding: 0 0 30px 0;
                margin: 0;
              `}
            >
              {entry.name}
            </h3>
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

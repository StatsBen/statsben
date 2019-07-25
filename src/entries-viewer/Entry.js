import React from "react";
import moment from "moment";
import { globals } from "../globals";
// import { css } from "@emotion/core";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: props.entry || null, hidden: true };
  }

  /** This function crawls through all the child nodes of an Entry component
   ** and finds all IMG elements, reads their "alt" attribute text, and
   ** generates a caption for the photo from the text.  **/
  addCaptionToImgFromAltText = entryElement => {
    const imgs = entryElement.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const alt = img.getAttribute("alt");
      const cls = img.getAttribute("class");
      const src = img.getAttribute("src");

      let newImgContainer = document.createElement("div");
      newImgContainer.classList.add(cls);

      let newImg = document.createElement("img");
      newImg.setAttribute("alt", alt);
      newImg.setAttribute("src", src);
      newImg.setAttribute("style", "width: 100%;");

      let captionStyle =
        "font-family: " +
        globals.fonts.accent +
        "; font-size: 0.8em;" +
        "color: " +
        globals.colours.fadedDark +
        ";";

      let caption = document.createElement("span");
      caption.innerHTML = alt;
      caption.classList.add("caption");
      caption.setAttribute("style", captionStyle);

      newImgContainer.append(newImg);
      newImgContainer.append(caption);

      img.replaceWith(newImgContainer);
    }
  };

  componentDidMount() {
    this.addCaptionToImgFromAltText(this.element);
  }

  render() {
    let { entry } = this.props;

    return (
      <div className={`entry-container`} ref={r => (this.element = r)}>
        <div className={`entry-date`}>
          <span>{moment(entry.Date, "MM/DD/YY").format("MM - DD - YY")}</span>
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

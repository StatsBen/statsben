import { globals } from "../globals";

/** This function crawls through all the child nodes of an Entry component
 ** and finds all IMG elements, reads their "alt" attribute text, and
 ** generates a caption for the photo from the text.  **/
const addCaptionToImgFromAltText = entryElement => {
  // Just bail if the element is null or whatever...
  if (!entryElement) return;

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
      "display:block;" + // <- ensures the line-height (below) takes effect.
      "font-family:" +
      globals.fonts.accent +
      ";font-size: 0.7em; " +
      "line-height: 1;" +
      "color:" +
      globals.colours.mediumGray +
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

export { addCaptionToImgFromAltText };

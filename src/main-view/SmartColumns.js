import React from "react";
import ReactDOM from "react-dom";
import Entry from "./Entry";

const minColWidth = 550;

const SmartColumns = (entries) => {
  const pageWidth = document.body.clientWidth;
  const nCols = Math.floor(pageWidth / minColWidth);
  const colWidth = Math.floor((1 / nCols) * 100);
  const container = document.getElementById("content-container");

  // Failsafe
  // TODO make error better...
  if (!entries || !Object.keys(entries).length || !container)
    return <span>Loading...</span>;
  const cols = [];

  const clearContainerAndMakeCols = () => {
    container.innerHTML = "";
    // Setup child columns
    for (let i = 0; i < nCols; i++) {
      let newCol = document.createElement("div");
      newCol.setAttribute("class", "column-container");
      newCol.style.position = "relative";
      newCol.style.float = "left";
      newCol.style.minHeight = "100px";
      newCol.style.minWidth = "10px";
      newCol.style.width = colWidth + "%";
      // newCol.style.background = "brown";
      newCol.style.paddingTop = "50px";
      container.append(newCol);
      cols[i] = { height: 0, element: newCol };
    }
  };

  const hiddenContainyBoi = document.createElement("div");
  hiddenContainyBoi.style.position = "absolute";
  hiddenContainyBoi.style.left = "-9999px";
  container.appendChild(hiddenContainyBoi);

  const insertEntryInOrder = (col, entryElement, key) => {
    if (!col || !entryElement) return; // Just bail...

    let hasBeenAdded = false;
    let keyNo = parseInt(key);
    for (let existingEntry of col.element.children) {
      let keyToCompare = existingEntry.getAttribute("index");
      if (keyNo < keyToCompare) {
        // console.log("inserting " + keyNo + " before " + keyToCompare);
        col.element.insertBefore(entryElement, existingEntry);
        hasBeenAdded = true;
      }
    }
    if (!hasBeenAdded) {
      col.element.appendChild(entryElement);
      // console.log("inserting " + keyNo + " at the end.");
    }
    col.height += entryElement.clientHeight;
  };

  const addElementToColumns = (element, key) => {
    let shortestIndex = 0;
    cols.forEach((col, i) => {
      if (cols[i].height < cols[shortestIndex].height) shortestIndex = i;
    });

    if (element) {
      insertEntryInOrder(cols[shortestIndex], element, key);
    } else {
      console.log("ref is undef");
    }
  };

  const imagesReady = async element => {
    let imgs = element.element.getElementsByTagName("img");
    return new Promise(resolve => {
      let imgPromises = [];
      for (let img of imgs) {
        let p = new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        imgPromises.push(p);
      }
      Promise.allSettled(imgPromises).then(() => {
        resolve();
      });
    });
  };

  let refPromises = [];
  let readyEntryElements = [];

  Object.keys(entries).forEach(key => {
    let p = new Promise((resolve, reject) => {
      let entryData = entries[key];

      let refIsReady = async element => {
        if (element && element.element) {
          readyEntryElements.push({
            index: parseInt(key),
            element: element.element
          });
          await imagesReady(element);
          resolve();
        } else {
          reject();
        }
      };

      let entryElement = (
        <Entry key={"thing-" + key} ref={refIsReady} entry={entryData} />
      );
      let intermediateContainer = document.createElement("div");
      ReactDOM.render(entryElement, intermediateContainer);
      hiddenContainyBoi.append(intermediateContainer);
    });

    refPromises.push(p);
  });

  Promise.allSettled(refPromises).then(() => {
    let preRenderScroll = window.scrollY;
    clearContainerAndMakeCols(container, nCols, colWidth, cols);
    readyEntryElements.forEach(({ index, element }) => {
      addElementToColumns(element, index);
    });
    window.scrollTo(0, preRenderScroll);
  });

  return <span> </span>;
};

export default SmartColumns;

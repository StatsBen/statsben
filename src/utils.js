export const tidyEntry = entry => {
  let entryContents = entry.data();
  let tidiedEntry = {};

  // Check for the required properties and throw errors if absent
  if (!entryContents.hasOwnProperty("name")) {
    // Throw an error or something... TODO
  } else if (!entryContents.hasOwnProperty("date")) {
    // Do something BAD TODO
  } else if (!entryContents.hasOwnProperty("contents")) {
    // Do something BAD TODO
  }

  Object.entries(entryContents).map(propertiesPair => {
    let key = propertiesPair[0];
    let val = propertiesPair[1];
    if (val && val != "") {
      tidiedEntry[key] = val;
    } else {
      tidiedEntry[key] = null;
    }
  });

  return tidiedEntry;
};

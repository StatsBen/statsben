export const tidyEntry = entry => {
  let entryContents = entry.data();
  let tidiedEntry = {};

  // Check for the required properties and throw errors if absent
  if (!entryContents.hasOwnProperty("name")) {
    // Throw an error or something... TODO
  } else if (!entryContents.hasOwnProperty("date")) {
    // Do something BAD TODO
  }

  Object.entries(entryContents).map(propertiesPair => {
    let key = propertiesPair[0];
    let val = propertiesPair[1];
    tidiedEntry[key] = val;
  });

  return tidiedEntry;
};

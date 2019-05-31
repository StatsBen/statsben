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

export const validateEntry = entry => {
  let errors = [];

  // First, check for empty stuff...
  if (!entry.hasOwnProperty("Name")) {
    errors.push(new Error("Your entry HAS to have a name, idiot..."));
  }

  if (!entry.hasOwnProperty("Date")) {
    errors.push(new Error("Date is required, dummy! Try again..."));
  }

  Object.entries(entry).map(propertiesPair => {
    let key = propertiesPair[0];
    let val = propertiesPair[1];
    if (val && val != "") {
      // Make sure the date is valid...
      if (key == "Date") {
        // Make sure Moment recognizes it, but just store the string, I guess.
      }
    }
  });

  return { errors, entry };
};

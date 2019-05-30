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
    if (val && val != "") {
      if (val.seconds) {
        console.log("CONVERTING DATE!!!");
        tidiedEntry[key] = val.toDate().toString();
      } else {
        tidiedEntry[key] = val;
      }
    } else {
      tidiedEntry[key] = null;
    }
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
        try {
          let cleanDate = new Date(entry["Date"]);
          entry["Date"] = cleanDate;
        } catch (error) {
          errors.push(
            new Error("the date you entered was invalid, try again!")
          );
          console.error(error.message);
        }
      }
    }
  });

  return { errors, entry };
};

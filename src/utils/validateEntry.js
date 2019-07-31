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
        entry.date = new Date(val);
      } else if (key == "tags") {
        Object.entries(val).map(innerPropPair => {
          let innerKey = innerPropPair[1].name;
          let innerVal = innerPropPair[1].value;
          if (innerKey == "types") {
            let typesArr = innerVal.split(", ");
            entry.types = typesArr;
          } else {
            entry[innerKey] = innerVal;
          }
        });
      }
    }
  });

  return { errors, entry };
};
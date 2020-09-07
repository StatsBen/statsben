export const getCountsByTypes = entries => {
  if (!entries) return null;

  // Its easiest to do this initially with an object.
  let results = {},
    types;

  entries.forEach(entry => {
    if (!entry.types || !Object.keys(entry.types).length) {
      throw new Error("This entry has no types: " + entry.name);
    }

    types = Object.keys(entry.types).filter(typeName => entry.types[typeName]);

    types.map(type => {
      if (!results.hasOwnProperty(type)) {
        results[type] = 0;
      }

      results[type]++;
    });
  });

  // its necessary to convert the results to an array before returning
  // (d3 likes data as arrays of objects...)
  let resultsAsArray = [];
  Object.keys(results).map(typeName => {
    resultsAsArray.push({
      name: typeName,
      count: results[typeName]
    });
  });

  console.log("RESULTS ARE: ");
  console.log(results);
  console.log(resultsAsArray);
  return resultsAsArray;
};

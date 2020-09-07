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

  return resultsAsArray;
};

export const getListOfAllRanges = entries => {
  if (!entries) return null;

  let ranges = [],
    range;

  entries.map(entry => {
    range = entry.range;
    if (!ranges.includes(range)) ranges.push(range);
  });
  
  return ranges;
};

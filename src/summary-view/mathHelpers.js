export const getListOfAllTypes = entries => {
  if (!entries) return null;

  let results = [],
    types;

  entries.map(entry => {
    if (!entry.types || !Object.keys(entry.types).length) return;

    types = Object.keys(entry.types).filter(typeName => entry.types[typeName]);

    types.map(type => {
      if (!results.includes(type)) {
        results.push(type);
      }
    });
  });

  return results;
};

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

export const getCountsByRanges = entries => {
  if (!entries) return null;

  let counts = {},
    range;

  entries.map(entry => {
    // if (!entry.range) throw new Error("No range data found for: " + entry.name);
    if (!entry.range) {
      console.warn("No range data found for: " + entry.name);
      return;
    }

    range = entry.range;

    if (!counts.hasOwnProperty(range)) {
      counts[range] = 0;
    }

    counts[range]++;
  });

  let results = [];

  Object.keys(counts).map(rangeName => {
    results.push({
      name: rangeName,
      count: counts[rangeName]
    });
  });

  return results;
};

export const isOfType = (entry, typeName) => {
  return (!entry || !entry.types || !entry.types[typeName])
}
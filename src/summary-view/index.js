import React, { useState, useEffect } from "react";
import Error from "./Error";
// import Pie from "./PieChart";
import { firestore } from "../authentication/firebase";
import AccordionEntry from "./AccordionEntry";
// import {
//   rangeCountsSelector,
//   rangesListSelector,
//   typesCountSelector,
//   typesListSelector
// } from "./entryFilterSelectors";

const SummaryView = () => {
  const [awaitingData, setAwaitingData] = useState(false);
  const [entryData, setEntryData] = useState(null);
  const [error, setError] = useState(null);

  /* Request the dataset and handle result */
  const getAllEntryData = () => {
    const handleDataResult = res => {
      setEntryData(res.docs.map(doc => doc.data()));
      setAwaitingData(false);
    };

    const handleError = err => {
      setError(err);
      setAwaitingData(false);
    };

    setAwaitingData(true);

    firestore
      .collection("entries")
      .get()
      .then(res => {
        handleDataResult(res);
      })
      .catch(err => {
        handleError(err);
      });
  };

  useEffect(getAllEntryData, []);

  // const types = typesListSelector(entryData);
  // const countsByType = typesCountSelector(entryData);
  // const ranges = rangesListSelector(entryData);
  // const countsByRange = rangeCountsSelector(entryData);

  return (
    <div>
      <h1>Adventure Log</h1>
      {awaitingData && "Loading..."}
      {error && <Error {...error} />}
      {/* entryData && <Pie {...{ entryData }} /> */}
      {/* FILTER_BY CONTROLS GO HERE */}
      {/* AN APPROPRIATE AGGREGATION OF THE CHOSEN TYPES GOES HERE */}
      {entryData &&
        entryData.map((entry, i) => (
          <AccordionEntry key={`e-${i}`} {...{ entry }} />
        ))}
    </div>
  );
};

export default SummaryView;

import React, { useState, useEffect } from "react";
import Error from "./Error";
// import Pie from "./PieChart";
import { firestore } from "../authentication/firebase";
// import AccordionEntry from "./AccordionEntry";
import Controls from "./Controls";
import EntryViewer from "./EntryViewer";
import {
  // rangeCountsSelector,
  rangesListSelector,
  // typesCountSelector,
  typesListSelector
} from "./entryFilterSelectors";
import {
  isOfType
  // logCountsNStuff
} from "./mathHelpers";

const typesOffByDefault = ["work", "projects", "publications"];

const SummaryView = () => {
  const [activeRangeFilters, setActiveRangeFilters] = useState("");
  const [activeTypeFilters, setActiveTypeFilters] = useState([]);
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
      .orderBy("date", "desc")
      .get()
      .then(res => {
        handleDataResult(res);
      })
      .catch(err => {
        handleError(err);
      });
  };

  useEffect(getAllEntryData, []);

  let filteredEntryData = entryData;

  if (entryData) {
    if (activeTypeFilters && activeTypeFilters.length) {
      activeTypeFilters.forEach(type => {
        filteredEntryData = filteredEntryData.filter(
          entry => !isOfType(entry, type)
        );
      });
    } else {
      typesOffByDefault.forEach(type => {
        filteredEntryData = filteredEntryData.filter(entry =>
          isOfType(entry, type)
        );
      });
    }
  }

  const types = typesListSelector(entryData); // yes, get these sans filter
  // const countsByType = typesCountSelector(filteredEntryData);
  const ranges = rangesListSelector(filteredEntryData);
  // const countsByRange = rangeCountsSelector(filteredEntryData);
  // logCountsNStuff(types, ranges, countsByType, countsByRange);

  const controlsProps = {
    activeRangeFilters,
    activeTypeFilters,
    ranges,
    types,
    setActiveRangeFilters,
    setActiveTypeFilters
  };

  return (
    <div>
      <h1>Adventure Log</h1>
      {awaitingData && "Loading..."}
      {error && <Error {...error} />}
      {/* entryData && <Pie {...{ filteredEntryData }} /> */}
      <Controls {...controlsProps} />
      {/* AN APPROPRIATE AGGREGATION OF THE CHOSEN TYPES GOES HERE */}
      {/* filteredEntryData &&
        filteredEntryData.map((entry, i) => (
          <AccordionEntry key={`e-${i}`} {...{ entry }} />
        )) */}
      {entryData && <EntryViewer {...{ filteredEntryData }} />}
    </div>
  );
};

export default SummaryView;

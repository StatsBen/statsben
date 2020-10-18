import React, { useState, useEffect } from "react";
import Error from "./Error";
// import Pie from "./PieChart";
import { firestore } from "../authentication/firebase";
import styled from "styled-components";
import AccordionViewer from "./accordion-viewer/AccordionViewer";
import Controls from "./Controls";
import DesktopEntryViewer from "./desktop-viewer/DesktopEntryViewer";
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
import { globals } from "../globals";

const typesOffByDefault = ["work", "projects", "publications"];

const Container = styled.div`
  max-width: ${globals.sizes.tabletBreakpoint};
  margin: 0 auto;
  @media (max-width: ${globals.sizes.tabletBreakpoint}) {
    width: 100%;
    padding: 0 0;
  }
  @media (min-width: ${globals.sizes.tabletBreakpoint}) {
    width: 90%;
    padding: 0 5%;
  }
`;

const SummaryView = () => {
  const [activeRangeFilter, setactiveRangeFilter] = useState("");
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

    if (activeRangeFilter && activeRangeFilter.length) {
      filteredEntryData = filteredEntryData.filter(
        entry => entry.range == activeRangeFilter
      );
    }
  }

  const types = typesListSelector(entryData); // yes, get these sans filter
  // const countsByType = typesCountSelector(filteredEntryData);
  const ranges = rangesListSelector(filteredEntryData);
  // const countsByRange = rangeCountsSelector(filteredEntryData);
  // logCountsNStuff(types, ranges, countsByType, countsByRange);

  const controlsProps = {
    activeRangeFilter,
    activeTypeFilters,
    ranges,
    types,
    setactiveRangeFilter,
    setActiveTypeFilters
  };

  return (
    <Container>
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
      {entryData && <DesktopEntryViewer {...{ filteredEntryData }} />}
      {entryData && <AccordionViewer entryData={filteredEntryData} />}
    </Container>
  );
};

export default SummaryView;

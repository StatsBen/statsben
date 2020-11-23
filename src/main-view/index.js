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

const typesOffByDefault = ["work", "projects", "publications", "certifications"];

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

const Banner = styled.h1`
  @media (max-width: ${globals.sizes.tabletBreakpoint}) {
    width: 90%;
    padding: 0 5%;
  }
`;

const Tagline = styled.p`
  width: calc(100% - 100px);
  margin-left: 50px;
  padding-bottom: 1.5em;
  color: ${globals.colours.charcoal};
  font-family: ${globals.fonts.accent};
`;

const MainView = () => {
  const [activeRangeFilter, setactiveRangeFilter] = useState("");
  const [activeTypeFilters, setActiveTypeFilters] = useState([]);
  const [awaitingData, setAwaitingData] = useState(false);
  const [entryData, setEntryData] = useState(null);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < parseInt(globals.sizes.mobileBreakpoint)
  );

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

  const switchViewIfNecessary = () => {
    // if (
    //   isMobile &&
    //   window.innerWidth > parseInt(globals.sizes.mobileBreakpoint)
    // ) {
    //   console.log("switching to desktop");
    //   setIsMobile(false);
    // } else if (
    //   !isMobile &&
    //   window.innerWidth < parseInt(globals.sizes.mobileBreakpoint)
    // ) {
    //   console.log("switching to mobile");
    //   setIsMobile(true);
    // }
    /* ^ Doesn't work, not sure why :'(  */
    setIsMobile(window.innerWidth < parseInt(globals.sizes.mobileBreakpoint));
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      switchViewIfNecessary();
    });
  }, []);

  const controlsProps = {
    activeRangeFilter,
    activeTypeFilters,
    ranges,
    types,
    setactiveRangeFilter,
    setActiveTypeFilters
  };

  const showMobile = entryData && isMobile;

  const showDesktop = entryData && !isMobile;

  return (
    <Container>
      <Banner>Adventure Log</Banner>
      <Tagline>
        Hello, I&apos;m Ben. Welcome to my website. Here&apos;s a log of things
        I&apos;ve done (mostly climbing-related).
      </Tagline>
      {awaitingData && "Loading..."}
      {error && <Error {...error} />}
      {/* entryData && <Pie {...{ filteredEntryData }} /> */}
      <Controls {...controlsProps} />
      {/* AN APPROPRIATE AGGREGATION OF THE CHOSEN TYPES GOES HERE */}
      {/* filteredEntryData &&
        filteredEntryData.map((entry, i) => (
          <AccordionEntry key={`e-${i}`} {...{ entry }} />
        )) */}
      {showMobile && <AccordionViewer {...{ filteredEntryData }} />}
      {showDesktop && <DesktopEntryViewer {...{ filteredEntryData }} />}
    </Container>
  );
};

export default MainView;

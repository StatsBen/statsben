import React, { useState, useEffect } from "react";
import Error from "./Error";
// import Pie from "./PieChart";
import { firestore } from "../authentication/firebase";
import styled from "styled-components";
import AccordionViewer from "./accordion-viewer/AccordionViewer";
import Controls from "./Controls";
import DesktopEntryViewer from "./desktop-viewer/DesktopEntryViewer";
import NothingToShow from "./NothingToShow";
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
import { fullWidthMobile } from "./FullWidthMobileDiv";

const typesOffByDefault = [
  "work",
  "projects",
  "publications",
  "certifications"
];

const Container = styled.div`
  max-width: ${globals.sizes.tabletBreakpoint};
  margin: 0 auto;
  width: 90%;
  padding: 0 5%;
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    width: 100%;
    padding: 0 0;
  }
`;

const Banner = styled.h1`
  ${fullWidthMobile};
  font-weight: 900;
  letter-spacing: -0.05em;
  padding: 80px 0 0 0;
  margin-top: 0;
  margin-bottom: 0;
  @media (max-width: ${globals.sizes.mobileBreakpoint}) {
    font-size: 2em;
  }
`;

const Tagline = styled.p`
  ${fullWidthMobile};
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

  let entryDataFilteredByType = entryData; // <- needed to compute available ranges.

  let entryDataFilteredByRange = entryData; // <- needed to compute available types.

  if (entryData) {
    if (activeTypeFilters && activeTypeFilters.length) {
      activeTypeFilters.forEach(type => {
        // on each iteration, subtract out the ones of the type 'type' (above).
        entryDataFilteredByType = entryDataFilteredByType.filter(
          entry => !isOfType(entry, type)
        );
      });
    } else {
      typesOffByDefault.forEach(type => {
        // Like above, 'subtract out' the entries of type 'type'.
        entryDataFilteredByType = entryDataFilteredByType.filter(entry =>
          isOfType(entry, type)
        );
      });
    }

    if (activeRangeFilter && activeRangeFilter.length) {
      // First, get the entries filtered only by range
      entryDataFilteredByRange = entryDataFilteredByRange.filter(
        entry => entry.range == activeRangeFilter
      );

      // Next, compond the range filter onto the previous results from type filter.
      filteredEntryData = entryDataFilteredByType.filter(
        entry => entry.range == activeRangeFilter
      );
    } else {
      // just set filteredEntryData directly since this won't get done otherwise
      filteredEntryData = entryDataFilteredByType;
    }
  }

  const types = typesListSelector(entryDataFilteredByRange);
  // const countsByType = typesCountSelector(filteredEntryData);
  const ranges = rangesListSelector(entryDataFilteredByType);
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

  const somethingToShow = filteredEntryData && filteredEntryData.length > 0;

  return (
    <Container>
      <Banner>Adventure Log</Banner>
      <Tagline>
        {/* Hello, I&apos;m Ben. Welcome to my website. */}Here&apos;s a log of
        things I&apos;ve done (mostly climbing-related).
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
      {somethingToShow && showMobile && (
        <AccordionViewer {...{ filteredEntryData }} />
      )}
      {somethingToShow && showDesktop && (
        <DesktopEntryViewer {...{ filteredEntryData }} />
      )}
      {!somethingToShow && <NothingToShow />}
    </Container>
  );
};

export default MainView;

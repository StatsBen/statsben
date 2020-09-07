import React, { useState, useEffect } from "react";
import Error from "./Error";
import Pie from "./PieChart";
import { firestore } from "../authentication/firebase";
import AccordionEntry from "./AccordionEntry";

const SummaryView = () => {
  const [awaitingData, setAwaitingData] = useState(false);
  const [entryData, setEntryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>Adventure Log</h1>
      {awaitingData && "Loading..."}
      {error && <Error {...error} />}
      {entryData && <Pie {...{ entryData }} />}
      {entryData &&
        entryData.map((entry, i) => (
          <AccordionEntry key={`e-${i}`} {...{ entry }} />
        ))}
    </div>
  );
};

export default SummaryView;

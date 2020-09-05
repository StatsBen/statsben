import React, { useState, useEffect } from "react";
import { firestore } from "../authentication/firebase";

const SummaryView = () => {
  const [awaitingData, setAwaitingData] = useState(false);
  const [entryData, setEntryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleDataResult = res => {
      setEntryData(res.docs.map(doc => doc.data()));
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
        console.error(err);
        setError(err);
      });
  }, []);

  return (
    <div>
      <h1>Adventure Log</h1>
      {awaitingData && "Loading..."}
      {entryData && `There are ${entryData.length} entries.`}
    </div>
  );
};

export default SummaryView;

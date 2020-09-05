import React from "react";
// import * as d3 from "d3";

const Pie = ({ entryData }) => {
  return (
    <div>
      <h2>This is a pie chart...</h2>
      <p>{entryData && `There are ${entryData.length} entries.`}</p>
    </div>
  );
};

export default Pie;

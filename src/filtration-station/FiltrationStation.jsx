import React from "react";

class FiltrationStation extends React.Component {
  render() {
    return (
      <div id="filtration-station">
        <div id="filter-dropdown">
          <span id="filter-station-label">Filter By</span>
          <button>Alpine</button>
          <button>Rock</button>
          <button>Ice</button>
          <button>Other</button>
        </div>
      </div>
    );
  }
}

export default FiltrationStation;

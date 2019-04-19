import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <header />
        <h1>Well, at least React is working!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

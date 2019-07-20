import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import "./global-styles.css";

const LoadableMainView = Loadable({
  loader: () => import("./entries-viewer/EntriesView"),
  loading() {
    return <p>Loading ... ... ... </p>;
  }
});

const LoadableAdminPortal = Loadable({
  loader: () => import("./admin-portal/AdminPortal"),
  loading() {
    return <p>Admin&#146;ll be ready in a sec, Ben!</p>;
  }
});

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <Router>
          <LoadableMainView path="/" />
          <LoadableAdminPortal path="/admin" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Loadable from "@loadable/component";
import Favicon from "react-favicon";
import "./global-styles.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(new URL('./sw.js', import.meta.url))
}

const LoadableMainView = Loadable(
  () => import("./MainView"),
  {
    fallback: <p>Loading ... ... ... </p>
  }
);

const LoadableAdminPortal = Loadable(
  () => import("./admin-portal/AdminPortal"),
  {
    fallback: <p>Admin&#146;ll be ready in a sec, Ben!</p>
  }
);

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <Favicon
          url={
            "https://firebasestorage.googleapis.com/v0/b/adventures-41a04.appspot.com/o/favicon.png?alt=media&token=9d153378-2ec6-4934-a912-e705ec420f02"
          }
        />
        <Router>
          <LoadableMainView path="/" />
          <LoadableAdminPortal path="/admin" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

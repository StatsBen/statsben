import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import Favicon from "react-favicon";
import "./global-styles.css";

const LoadableMainView = Loadable({
  loader: () => import("./MainView"),
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

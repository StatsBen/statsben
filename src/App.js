import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import Favicon from "react-favicon";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/reducers";
import "./global-styles.css";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

const LoadableMainView = Loadable({
  loader: () => import("./main-view/MainView"),
  loading() {
    return <p>Loading ... ... ... </p>;
  }
});

const LoadableAdminPortal = Loadable({
  loader: () => import("./admin-portal/AdminPortal"),
  loading() {
    return <p>{`Admin'll be ready in a sec, Ben!`}</p>;
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

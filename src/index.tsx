import * as React from "react";

import * as ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import RouteApp from "./routeApp";
import "./style.less";

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

if (process.env.MOCK === "true") {
  require("./mock");
}

const App = () => {
  return (
    <Provider store={store}>
      <RouteApp />
    </Provider>
  );
};

ReactDom.render(<App />, document.getElementById("root"));

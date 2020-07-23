import * as React from "react";

import * as ReactDom from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import RouteApp from "./routeApp";
import "./style.less";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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

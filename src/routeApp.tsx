import * as React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./pages/home";

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </HashRouter>
  );
};

import * as React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Login from "./pages/login";
import Registor from "./pages/registor";
import Home from "./pages/home";
import AuthRoute from "./wrapper/authRoute";

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registor} />
        <AuthRoute path="/" component={Home} />
      </Switch>
    </HashRouter>
  );
};

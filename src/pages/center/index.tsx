import * as React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import DeviceMap from "../deviceMap";

// 监控中心
const Center = (props) => {
  const path = props.match.path;
  return (
    <Switch>
      <Route
        exact
        path={path}
        render={() => <Redirect to={`${path}/device-map`} />}
      ></Route>
      <Route exact path={`${path}/device-map`} component={DeviceMap}></Route>
    </Switch>
  );
};

export default Center;

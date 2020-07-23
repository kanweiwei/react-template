import * as React from "react";
import { Layout, Menu } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "@/layouts/adminLayout";
import Dashboard from "../dashboard";
import Center from "../center";

const Home = (props) => {
  const path = props.match.path;
  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => <Redirect to="/dashboard" />}
      ></Route>
      <Route
        exact
        path={`${path}dashboard`}
        render={(props) => <AdminLayout {...props} component={Dashboard} />}
      />
      <Route
        path={`${path}center`}
        render={(props) => <AdminLayout {...props} component={Center} />}
      />
    </Switch>
  );
};

export default Home;

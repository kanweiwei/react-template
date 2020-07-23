import * as React from "react";
import Cookie from "js-cookie";
import { RouteComponentProps, Route } from "react-router-dom";

const CheckAuth = (props: RouteComponentProps) => {
  const token = Cookie.get("token");

  React.useEffect(() => {
    if (!token) {
      props.history.replace("/login");
    }
  }, []);

  if (!token) {
    return null;
  }

  return props.children;
};

type AuthRouteProps = {
  component: React.ComponentType | React.ElementType;
  path: string;
  exact?: boolean;
};

const AuthRoute = (props: AuthRouteProps) => {
  let C = props.component;
  return (
    <Route
      path={props.path}
      exact={!!props.exact}
      render={(props) => (
        <CheckAuth {...props}>
          <C {...props} />
        </CheckAuth>
      )}
    />
  );
};

export default AuthRoute;

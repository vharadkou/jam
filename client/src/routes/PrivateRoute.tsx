import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

interface Props extends RouteProps {
  isAuth?: boolean;
  role?: string;
}

export const PrivateRoute = ({ component: Component, isAuth, role, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.log('private router', rest);
        return (
          isAuth && !role ? (<Redirect to="/role" />) :
            isAuth && Component ? (
              <Component {...props} />
            ) : (
                <Redirect to="/welcome" />
              )
        )
      }
      }
    />
  );
};

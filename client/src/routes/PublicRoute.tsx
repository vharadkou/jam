import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

interface Props extends RouteProps {
  isAuth?: boolean;
  role?: string;
}

export const PublicRoute = ({ component: Component, isAuth, role, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          isAuth && !role ? (<Redirect to="/role" />) :
            !isAuth && Component ? (
              <Component {...props} />
            ) : (
                <Redirect to="/home" />
              )
        )
      }
      }
    />
  );
};

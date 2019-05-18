import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

interface Props extends RouteProps {
  isAuth?: boolean;
}

export const PublicRoute = ({ component: Component, isAuth, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth && Component ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

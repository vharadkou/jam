import React, { useMemo } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Home } from 'routes/Home';
import { Auth } from 'routes/Auth';
import { Welcome } from 'routes/Welcome';
import { Payments } from 'routes/Payments';
import { CreateRequest } from 'routes/CreateRequest';
import { History } from 'routes/History';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { SwitchRole } from 'routes/SwitchRole';
import { UserCategories } from 'routes/UserCategories';
import { Requests } from 'routes/Requests';
import { Popular } from 'routes/Popular';
import { TopBar } from 'components/TopBar';
import { LoadingScreen } from 'components/LoadingScreen';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';
import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const browserHistory = createBrowserHistory();

const useStyles = makeStyles(theme => createStyles({
  toolbar: theme.mixins.toolbar as CSSProperties,
}))

export const App = observer(() => {
  const { routerStore, authStore: { isLoading, user, userData } } = useStore();

  const history = useMemo(
    () => syncHistoryWithStore(browserHistory, routerStore),
    [routerStore]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/(auth|welcome|role)"
          render={() => <AuthContainer isAuth={!!user} role={userData && userData.role} />}
        />
        <Route render={() => <DefaultContainer isAuth={!!user} role={userData && userData.role} />} />
      </Switch>
    </Router>
  );
});

type ContainerProps = { isAuth: boolean, role: string };

const AuthContainer = ({ isAuth, role }: ContainerProps) => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/welcome" />} />
    <PublicRoute isAuth={isAuth} role={role} path="/welcome" component={Welcome} />
    <PublicRoute isAuth={isAuth} role={role} path="/auth" component={Auth} />
    <Route path="/role" component={SwitchRole} />
  </div>
);

const DefaultContainer = ({ isAuth, role }: ContainerProps) => {
  const classes = useStyles();

  return (
    <div>
      <TopBar />
      <div className={classes.toolbar} />
      <div>
        {(role === 'client') ? (
          <>
            <Route exact path="/" render={() => <Redirect to="/user/home" />} />
            <Route exact path="/user" render={() => <Redirect to="/user/home" />} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/home" component={Home} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/payments" component={Payments} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/request/create/:categoryId" component={CreateRequest} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/history" component={History} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/categories" component={UserCategories} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/requests/:categoryName" component={Requests} />
            <PrivateRoute isAuth={isAuth} role={role} path="/user/popular" component={Popular} />
          </>
        ) : (
            <>
              <Route exact path="/" render={() => <Redirect to="/master/home" />} />
              <Route exact path="/master" render={() => <Redirect to="/master/home" />} />
              <PrivateRoute isAuth={isAuth} role={role} path="/master/home" component={Home} />
            </>
          )}

      </div>
    </div>
  )
};

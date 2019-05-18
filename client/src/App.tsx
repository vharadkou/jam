import React, { useMemo } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Home } from 'routes/Home';
import { Auth } from 'routes/Auth';
import { Welcome } from 'routes/Welcome';
import { Payments } from 'routes/Payments';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { TopBar } from 'components/TopBar';
import { LoadingScreen } from 'components/LoadingScreen';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';

const browserHistory = createBrowserHistory();

export const App = observer(() => {
  const { routerStore, authStore } = useStore();

  const history = useMemo(
    () => syncHistoryWithStore(browserHistory, routerStore),
    [routerStore]
  );

  if (authStore.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/(auth|welcome)"
          render={() => <AuthContainer isAuth={!!authStore.user} />}
        />
        <Route render={() => <DefaultContainer isAuth={!!authStore.user} />} />
      </Switch>
    </Router>
  );
});

type ContainerProps = { isAuth: boolean };

const AuthContainer = ({ isAuth }: ContainerProps) => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/welcome" />} />
    <PublicRoute isAuth={isAuth} path="/welcome" component={Welcome} />
    <PublicRoute isAuth={isAuth} path="/auth" component={Auth} />
  </div>
);

const DefaultContainer = ({ isAuth }: ContainerProps) => (
  <div>
    <TopBar />
    <div className="container">
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PrivateRoute isAuth={isAuth} path="/home" component={Home} />
      <PrivateRoute isAuth={isAuth} path="/payments" component={Payments} />
    </div>
  </div>
);

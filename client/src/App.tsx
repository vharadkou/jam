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
import { TopBar } from 'components/TopBar';
import { LoadingScreen } from 'components/LoadingScreen';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';

const browserHistory = createBrowserHistory();

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
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/welcome" />} />
    <PublicRoute isAuth={isAuth} role={role} path="/welcome" component={Welcome} />
    <PublicRoute isAuth={isAuth} role={role} path="/auth" component={Auth} />
    <Route path="/role" component={SwitchRole} />
  </div>
);

const DefaultContainer = ({ isAuth, role }: ContainerProps) => (
  <div>
    <TopBar />
    <div className="container">
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PrivateRoute isAuth={isAuth} role={role} path="/home" component={Home} />
      <PrivateRoute isAuth={isAuth} role={role} path="/payments" component={Payments} />
      <PrivateRoute isAuth={isAuth} role={role} path="/request/create/:categoryId" component={CreateRequest} />
      <PrivateRoute isAuth={isAuth} role={role} path="/history" component={History} />
      <PrivateRoute isAuth={isAuth} role={role} path="/user/categories" component={UserCategories} />
      <PrivateRoute isAuth={isAuth} role={role} path="/requests/:categoryName" component={Requests} />
    </div>
  </div>
);

import React, { useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import IconButton from '@material-ui/core/IconButton';
import Arrowback from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import { matchPath } from 'react-router';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 0,
    },
    toolbar: {
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

export const TopBar = observer((props: any) => {
  const classes = useStyles();
  const { authStore, routerStore } = useStore();

  const login = useCallback(() => {
    routerStore.push('/auth');
  }, [routerStore]);

  const back = useCallback(() => {
    routerStore.goBack();
  }, [routerStore]);

  const isHome = routerStore.location.pathname === '/user/home' ||
    routerStore.location.pathname === '/master/home';

  const name = matchPath(routerStore.location.pathname, '/user/history') ? 'История' :
    matchPath(routerStore.location.pathname, '/user/categories') ? 'Категории' :
      matchPath(routerStore.location.pathname, '/user/requests') ? 'Услуги' :
        matchPath(routerStore.location.pathname, '/user/request/create') ? 'Заявка' :
          matchPath(routerStore.location.pathname, '/user/popular') ? 'Популярные' :
            '';

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isHome ? (
            <div className={classes.logo}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6">
                Главная
              </Typography>
            </div>
          ) : (
              <div className={classes.logo}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={back}
                >
                  <Arrowback />
                </IconButton>
                <Typography variant="h6">
                  {name}
                </Typography>
              </div>
            )}
          {authStore.user ? (
            <Button color="inherit" onClick={authStore.logout}>
              Выйти
            </Button>
          ) : (
              <Button color="inherit" onClick={login}>
                Войти
            </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
});

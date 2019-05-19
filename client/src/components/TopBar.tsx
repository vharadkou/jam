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

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      justifyContent: 'space-between'
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

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          {isHome ? (
            <Typography variant="h6">
              Главная
            </Typography>
          ) : (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={back}
              >
                <Arrowback />
              </IconButton>
            )}
          {authStore.user ? (
            <Button color="inherit" onClick={authStore.logout}>
              Logout
            </Button>
          ) : (
              <Button color="inherit" onClick={login}>
                Login
            </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
});

import React, { useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const TopBar = observer(() => {
  const classes = useStyles();
  const { authStore, routerStore } = useStore();

  const login = useCallback(() => {
    routerStore.push('/auth');
  }, [routerStore]);

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
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

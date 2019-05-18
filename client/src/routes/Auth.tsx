import React, { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
  })
);

export const Auth = observer(() => {
  const classes = useStyles();
  const { authStore, routerStore } = useStore();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current && authStore.startAuthUi(ref.current);
  }, [authStore]);

  const back = useCallback(() => {
    routerStore.goBack();
  }, [routerStore]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={back}
          >
            <Arrowback />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div ref={ref} />
    </div>
  );
});

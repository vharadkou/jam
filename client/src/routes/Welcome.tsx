import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import logo from 'media/logo.jpg';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    logo: {
      height: '40vmin',
      pointerEvents: 'none',
    },
    header: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
    text: {
      margin: theme.spacing(1),
    },
  })
);

export const Welcome = observer(() => {
  const classes = useStyles();
  const { routerStore } = useStore();

  const login = useCallback(() => {
    routerStore.push('/auth');
  }, [routerStore]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
        <Typography className={classes.text}>СанТехУбер</Typography>
        <Button variant="contained" color="primary" onClick={login}>
          Войти чтобы начать
        </Button>
      </header>
    </div>
  );
});

import React from 'react';
import { observer } from 'mobx-react-lite';
import logo from 'logo.svg';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    logo: {
      animation: 'App-logo-spin infinite 20s linear',
      height: '40vmin',
      pointerEvents: 'none',
    },
    header: {
      backgroundColor: '#282c34',
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
  })
);

export const Home = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
        <p>EPAM-JAM</p>
      </header>
    </div>
  );
});

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: 'calc(100vh - 50px)',
    },
    dot: {
      position: 'relative',
      display: 'inline-block',
      width: '20px',
      height: '20px',
      backgroundColor: 'rgba(128, 128, 128, 0)',
      borderRadius: '50%',
      margin: '12px',
      animation: 'scale 1.8s infinite',
    },
    dot1: {
      animationDelay: '0s',
      backgroundColor: '#008744',
      opacity: 0,
    },
    dot2: {
      animationDelay: '0.4s',
      backgroundColor: '#d62d20',
      opacity: 0,
    },
    dot3: {
      animationDelay: '0.8s',
      backgroundColor: '#ffa700',
      opacity: 0,
    },
    dot4: {
      animationDelay: '1s',
      backgroundColor: '#4270a4',
      opacity: 0,
    },
  })
);

export const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classnames(classes.dot, classes.dot1)} />
      <div className={classnames(classes.dot, classes.dot2)} />
      <div className={classnames(classes.dot, classes.dot3)} />
      <div className={classnames(classes.dot, classes.dot4)} />
    </div>
  );
};

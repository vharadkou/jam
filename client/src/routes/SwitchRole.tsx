import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';
import manImage from 'media/man.svg';
import workerImage from 'media/worker.svg';
import { RoleCard } from 'components/RoleCard';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    card: {
      maxWidth: 345,
      margin: theme.spacing(1)
    },
    header: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
  })
);

export const SwitchRole = observer(() => {
  const classes = useStyles();
  const { authStore } = useStore();

  const manRole = useCallback(() => {
    authStore.updateUser('client');
  }, []);

  const workerRole = useCallback(() => {
    authStore.updateUser('employee');
  }, []);

  if (authStore.userData && authStore.userData.role) {
    return <Redirect to="/home" />
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <RoleCard className={classes.card} text="Пользователь" image={manImage} onClick={manRole} />
        <RoleCard className={classes.card} text="Рабочий" image={workerImage} onClick={workerRole} />
      </header>
    </div>
  );
});

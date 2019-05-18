import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

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

export const CreateRequest = observer(({ match: { params: { categoryId } } }: any) => {
  const classes = useStyles();

  const { ordersStore, authStore } = useStore();
  useEffect(() => {
    if (authStore.user)
      ordersStore.load(authStore.user.phoneNumber)
  }, [])
  return (
    <div className={classes.root}>
      {
        ordersStore.Orders ?
          ordersStore
            .Orders
            .map(order => JSON.stringify(order))
          : null
      }
    </div>
  );
});

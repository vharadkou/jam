import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { HistoryCard } from '../components/HistoryCard'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    main: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
      marginTop: '70px',
    },
    text: {
      margin: theme.spacing(1),
    },
    card: {
      width: 'calc(100% - 20px)',
      padding: '10px 0',
    },
  })
);

export const History = observer(() =>
{
  const classes = useStyles();
  const { ordersStore, authStore } = useStore();

  useEffect(() =>
  {
    if (authStore.user)
      ordersStore.load(authStore.user.phoneNumber)
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
            {
              ordersStore.Orders ?
                ordersStore
                  .Orders
                  .map((order, i) => <div className={classes.card}>
                  <HistoryCard order={order.order} /> </div>)
                : null
            } 
      </div>
    </div>
  );
});

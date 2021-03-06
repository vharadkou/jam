import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { HistoryCard, Order } from 'components/HistoryCard'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';
import { CSSProperties } from '@material-ui/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    main: {
      display: 'flex',
      minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100% - ${(theme.mixins.toolbar[theme.breakpoints.up('sm')] as CSSProperties).minHeight}px)`,
      },
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
    },
    text: {
      margin: theme.spacing(1),
    },
    card: {
      width: 'calc(100% - 20px)',
      padding: '10px 0',
    },
    progress: {
      margin: theme.spacing(2)
    },
  })
);

export const History = observer(() => {
  const classes = useStyles();
  const { ordersStore, authStore, paymentStore } = useStore();
  let interval;

  useEffect(() => {
    if (authStore.user)
      interval = setInterval(() => {
        ordersStore.load(authStore.user!.phoneNumber)
      }, 5000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  const makePayment = useCallback(async (order: Order) => {
    const payments = order.order.services.map(service => ({
      label: service.name,
      value: service.price.toString(),
    }))

    await paymentStore.showPayment(payments);
    await ordersStore.updatePaymentStatus(order.number);

    if (authStore.user) {
      ordersStore.load(authStore.user.phoneNumber);
    }
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {!ordersStore.Orders && (
          <CircularProgress className={classes.progress} />
        )}
        {
          ordersStore.Orders ?
            ordersStore
              .Orders
              .map((order, i) => <div key={i} className={classes.card}>
                <HistoryCard order={order} onPayment={makePayment} onStatusUpdate={()=>{}}/> </div>)
            : null
        }
      </div>
    </div>
  );
});

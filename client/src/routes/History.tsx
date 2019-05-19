import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { HistoryCard } from 'components/HistoryCard'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';
import { CSSProperties } from '@material-ui/styles/withStyles';

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
  })
);

export const History = observer(() => {
  const classes = useStyles();
  const { ordersStore, authStore } = useStore();

  useEffect(() => {
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
              .map((order, i) => <div key={i} className={classes.card}>
                <HistoryCard order={order.order} /> </div>)
            : null
        }
      </div>
    </div>
  );
});

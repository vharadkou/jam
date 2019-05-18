import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { paymentsRecords } from '../mocks/payments';

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
      width: 'calc(100% - 60px)',
      padding: '20px 0',
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

  const orders = [
    {
      name: 'Name of smthg',
      date: '12-09-2018 12.15',
      sum: 35,
      services: [
        {
          name: 'dsgdfgf',
          count: 2,
          price: 20
        },
        {
          name: 'Fdsfdgfdg',
          count: 1,
          price: 50
        },
        {
          name: 'REt kdsjtl',
          count: 3,
          price: 30
        }
      ],
    },
    // {
    //   name: 'Name of smthg',
    //   date: '12-09-2018 12.15',
    //   sum: 35,
    //   services: [],
    // },
    // {
    //   name: 'Name of smthg',
    //   date: '12-09-2018 12.15',
    //   sum: 35,
    //   services: [],
    // },
    // {
    //   name: 'Name of smthg',
    //   date: '12-09-2018 12.15',
    //   sum: 35,
    //   services: [],
    // },
    // {
    //   name: 'Name of smthg',
    //   date: '12-09-2018 12.15',
    //   sum: 35,
    //   services: [],
    // },


  ]

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {orders.map((order: any, i) => (
          <div key={i} className={classes.card}>
            {
              ordersStore.Orders ?
                ordersStore
                  .Orders
                  .map((order, i) => <HistoryCard key={i} order={order.order} />)
                : null
            }
            {/* <HistoryCard order={order} /> */}
          </div>
        ))}
      </div>
    </div>
  );
});

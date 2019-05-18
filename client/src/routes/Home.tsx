import React from 'react';
import { observer } from 'mobx-react-lite';
import { HomeCard } from 'components/HomeCard';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ListIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import HistoryIcon from '@material-ui/icons/History';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';

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
    card: {
      maxWidth: 345,
    },
  })
);

export const Home = observer(() => {
  const classes = useStyles();
  const { paymentStore } = useStore();

  const handleCheckout = async () => {
    await paymentStore.showPayment();
  }

  const handleTestItem = () => {
    paymentStore.appendItem({ label: 'Test Item', value: '18' });

  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <HomeCard className={classes.card} text='????? ????????????' image={WhatshotIcon} />
        <HomeCard className={classes.card} text='???????' image={ListIcon} />
        <HomeCard className={classes.card} text='???????? ????????????' image={HelpIcon} />
        <HomeCard className={classes.card} text='???????' image={HistoryIcon} />
        <HomeCard className={classes.card} text='?????' image={CreditCardIcon} />
        <HomeCard className={classes.card} text='???????' image={AccountBoxIcon} />
        <button onClick={handleTestItem}>add test item</button>
        <button onClick={handleCheckout}>checkout</button>
      </header>
    </div>
  );
});



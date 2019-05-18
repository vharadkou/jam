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
import { CSSProperties } from '@material-ui/styles/withStyles';
import { useStore } from 'stores';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar as CSSProperties,
    header: {
      minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100% - ${(theme.mixins.toolbar[theme.breakpoints.up('sm')] as CSSProperties).minHeight}px)`,
      },
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    card: {
      maxWidth: 140,
      maxHeight: 140,
      flex: '1 0 140px',
      margin: theme.spacing(1),
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
      <div className={classes.toolbar} />
      <header className={classes.header}>
        <div className={classes.cards}>
          <HomeCard className={classes.card} text='Популярные' image={WhatshotIcon} />
          <HomeCard className={classes.card} text='Каталог' image={ListIcon} />
          <HomeCard className={classes.card} text='Исследование' image={HelpIcon} />
          <HomeCard className={classes.card} text='История' image={HistoryIcon} />
          <HomeCard className={classes.card} text='Карта' image={CreditCardIcon} />
          <HomeCard className={classes.card} text='Профиль' image={AccountBoxIcon} />
        </div>
        <button onClick={handleTestItem}>add test item</button>
        <button onClick={handleCheckout}>checkout</button>
      </header>
    </div>
  );
});



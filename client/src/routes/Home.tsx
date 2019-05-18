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

  const handleCheckout = async () => {
    const methodData = [{
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard", "amex"],
        supportedTypes: ["credit", "debit"]
      }
    }];
    const details = {
      total: {
        label: "Total",
        amount: {
          currency: "EUR",
          value: "17.30"
        }
      },
      displayItems: [{
        label: "Some random item",
        amount: {
          currency: "EUR",
          value: "10.00"
        }
      }, {
        label: "Shipping",
        amount: {
          currency: "EUR",
          value: "5.00"
        }
      }, {
        label: "Sales Tax",
        amount: {
          currency: "EUR",
          value: "2.30"
        }
      }],
      shippingOptions: [{
        id: "STANDARD",
        label: "Standard Shipping",
        amount: {
          currency: "EUR",
          value: "5.00"
        },
        selected: !0
      }, {
        id: "EXPEDITED",
        label: "Fast Shipping",
        amount: {
          currency: "EUR",
          value: "10.00"
        }
      }]
    };

    if ((window as any).PaymentRequest) {
      const payments = new PaymentRequest(methodData, details, {
        requestShipping: !0
      })
      await payments.canMakePayment();
      await payments.show();
    }
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
        <button onClick={handleCheckout}>checkout</button>
      </header>
    </div>
  );
});



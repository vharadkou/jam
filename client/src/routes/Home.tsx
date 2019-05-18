import React from 'react';
import { observer } from 'mobx-react-lite';
import logo from 'logo.svg';

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
        <img src={logo} className={classes.logo} alt="logo" />
        <p>EPAM-JAM</p>
        <button onClick={handleCheckout}>checkout</button>
      </header>
    </div>
  );
});



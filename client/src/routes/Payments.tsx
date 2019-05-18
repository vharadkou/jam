import React from 'react';
import { observer } from 'mobx-react-lite';
import { paymentsRecords } from '../mocks/payments';

import { PaymentsTable } from '../components/PaymentsTable'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: '20px',
    },
    main: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
      width: 'calc(100% - 20px)',
      margin: '0 10px',
    },
    text: {
      margin: theme.spacing(1),
    },
  })
);

export const Payments = observer(() =>
{
  const classes = useStyles();
  const services = paymentsRecords;

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <PaymentsTable services={services} showTotal={true} />
      </div>
    </div>
  );
});

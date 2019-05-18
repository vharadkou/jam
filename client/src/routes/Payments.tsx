import React from 'react';
import { observer } from 'mobx-react-lite';
import { paymentsRecords } from '../mocks/payments';

import { PaymentsTable } from '../components/PaymentsTable'
import { makeStyles, createStyles } from '@material-ui/core/styles';

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
  })
);

export const Payments = observer(() =>
{
  const classes = useStyles();

  const headers = ['Оказанная услуга', 'Кол., шт', 'Цена, р', 'Ст-ть, р'];
  const records = paymentsRecords;
  const total = records.reduce((acc, it, i) => (+it[it.length - 1] + acc), 0)
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <PaymentsTable headers={headers} records={records} total={total.toString()} />
      </div>
    </div>
  );
});

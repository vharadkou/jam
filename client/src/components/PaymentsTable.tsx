import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
    },
    row: {
    },
    cell: {
      padding: theme.spacing(1),
      minWidth: '40px',
      textAlign: 'start',
    },
    total: {
      textAlign: 'right',
      padding: '10px 16px 10px 10px',
    }
  })

);

const headers = ['Оказанная услуга', 'Кол., шт', 'Цена, р', 'Ст-ть, р'];

export const PaymentsTable
  = ({ services, showTotal }:
    { services: { name: string, price: number, count: number }[], showTotal?: boolean }) => {
    const classes = useStyles();
    const records = services.map(it => [it.name, it.count, it.price, it.count * it.price]);
    const total = records.reduce((acc, it, i) => (+it[it.length - 1] + acc), 0)

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>{headers[0]}</TableCell>
              {headers.filter((_: string, ind: number) => ind > 0).map((header: string, i) => (
                <TableCell key={i} className={classes.cell} align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, i) => (
              <TableRow key={i} className={classes.row}>
                <TableCell className={classes.cell} component="th" scope="row">{record[0]}</TableCell>
                {record.filter((_: string | number, ind: number) => ind > 0).map((data: string | number, i) => (
                  <TableCell key={i} className={classes.cell} align="right">{data}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showTotal ? <Typography variant="h6" className={classes.total}>
          Итого: {total} р
        </Typography> : ''}
      </Paper>

    );
  };


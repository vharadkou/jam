import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 'calc(100% - 60px)',
      margin: '30px',
      overflowX: 'auto',
    },
    table: {
    },
    row: {
    },
    cell: {
      padding: '10px',
      minWidth: '40px',
      textAlign: 'start',
    },
    total: {
      textAlign: 'right',
      padding: '10px 16px 10px 10px',
    }
  })

);


export const PaymentsTable
  = ({ headers, records, total }: { headers: string[], records: (string | number)[][], total?: string }) =>
  {
    const classes = useStyles();

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>{headers[0]}</TableCell>
              {headers.filter((_: string, ind: number) => ind > 0).map((header: string) => (
                <TableCell className={classes.cell} align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, i) => (
              <TableRow key={i} className={classes.row}>
                <TableCell className={classes.cell} component="th" scope="row">{record[0]}</TableCell>
                {record.filter((_: string | number, ind: number) => ind > 0).map((data: string | number) => (
                  <TableCell className={classes.cell} align="right">{data}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {total? <Typography variant="h6" className={classes.total}>
          Итого: {total}
        </Typography>:''}
      </Paper>

    );
  };


import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { PaymentsTable } from './PaymentsTable';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minWidth: 275,
      width: '100%',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    services: {
      padding: 0,
    },
  })

);
const fortamDate = (date: Date) => {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export const HistoryCard
  = ({ order }: {
    order:
    {
      date: any, name: string, services:
      { name: string, count: number, price: number }[]
    }
  }) => {
    const [expanded, setExpanded] = useState(
      false
    );
    const classes = useStyles();
    const total = order.services.reduce((acc, el, i) => el.count * el.price + acc, 0);

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Выполненная услуга:
          </Typography>
          <Typography variant="h5" component="h2">
            {order.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {fortamDate(order.date.toDate())}
          </Typography>
          <Typography component="p">
            Стоимость: {total} р
          </Typography>

        </CardContent>

        <ExpansionPanel expanded={expanded === true} onChange={event => setExpanded(!expanded)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {expanded ? <Typography>Скрыть список услуг</Typography>
              : <Typography>Показать список услуг</Typography>
            }
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.services}>

            <PaymentsTable services={order.services} />

          </ExpansionPanelDetails>
        </ExpansionPanel>

      </Card>
    );
  };
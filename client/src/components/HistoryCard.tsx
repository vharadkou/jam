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
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CardIcon from '@material-ui/icons/CreditCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      minWidth: 275,
      width: '100%',
    },
    pos: {
      marginBottom: 12,
    },
    services: {
      padding: 0,
    },
    payment: {
      margin: theme.spacing(1)
    }
  })

);
const fortamDate = (date: Date) => {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export enum Status {
  InPool = 'Рассматривается',
  Accepted = 'Принята',
  InProgress = 'В процесс',
  WaitingPayment = 'Ожидание оплаты',
  Payed = 'Оплачено'
}

export interface Order {
  date: any,
  name: string,
  services:
  { name: string, count: number, price: number }[],
  status: string
}

export const HistoryCard
  = ({ order, onPayment }: {
    order: Order,
    onPayment: (order: Order) => void
  }) => {
    const [expanded, setExpanded] = useState(
      false
    );
    const classes = useStyles();
    const total = order.services.reduce((acc, el, i) => el.count * el.price + acc, 0);

    const handlePayment = () => {
      onPayment(order);
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {order.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {fortamDate(order.date.toDate())}
          </Typography>
          <Typography component="p" className={classes.payment}>
            Стоимость: {total} BYN
          </Typography>
          {order.status === Status.Payed && (
            <Chip color="primary" avatar={<Avatar><CardIcon /></Avatar>} label={order.status} />
          )}
          {order.status === Status.WaitingPayment && (
            <Chip color="default" onClick={handlePayment} avatar={<Avatar><AttachMoneyIcon /></Avatar>} label={order.status} />
          )}
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

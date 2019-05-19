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
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import green from '@material-ui/core/colors/green';

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
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    finish: {
      marginTop: '5px',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    chip: {
      backgroundColor: '#303f9f !important',
    }
  })

);
const fortamDate = (date: Date) =>
{
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export enum Status
{
  InPool = 'Рассматривается',
  Accepted = 'Принята',
  InProgress = 'В процессе',
  WaitingPayment = 'Ожидание оплаты',
  Payed = 'Оплачено'
}

export interface Order
{
  number: number;
  order: {
    date: any,
    name: string,
    services:
    { name: string, count: number, price: number }[],
    status: string
  },
  phoneNumber: string
}

export const HistoryCard
  = ({ order, onPayment, onStatusUpdate, isMaster }: {
    order: Order,
    onPayment: (order: Order) => void,
    onStatusUpdate?: (order: Order, status: Status) => void,
    isMaster?: boolean,
  }) =>
  {
    const [expanded, setExpanded] = useState(
      false
    );
    const classes = useStyles();
    const total = order.order.services.reduce((acc, el, i) => el.count * el.price + acc, 0);

    const handlePayment = () =>
    {
      onPayment(order);
    }

    const startOrder = () =>
    {
      onStatusUpdate && onStatusUpdate(order, Status.InProgress);
    }
    const finishOrder = () =>
    {
      onStatusUpdate && onStatusUpdate(order, Status.WaitingPayment);
    }
    const addService = () =>
    {
      console.log('add service');
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {order.order.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {fortamDate(order.order.date.toDate())}
          </Typography>
          <Typography component="p" className={classes.payment}>
            Стоимость: {total} BYN
          </Typography>
          {!isMaster && order.order.status === Status.Payed && (
            <Chip color="primary" avatar={<Avatar className={classes.chip}><CardIcon /></Avatar>} label={order.order.status} />
          )}
          {!isMaster && order.order.status === Status.WaitingPayment && (
            <Chip color="default" onClick={handlePayment} avatar={<Avatar><AttachMoneyIcon /></Avatar>} label={order.order.status} />
          )}
          {!isMaster && order.order.status === Status.InProgress && (
            <Chip color="default" avatar={<Avatar><AllInclusiveIcon /></Avatar>} label={order.order.status} />
          )}
          {!isMaster && order.order.status === Status.Accepted && (
            <Chip color="default" avatar={<Avatar><HowToRegIcon /></Avatar>} label={order.order.status} />
          )}
          {!isMaster && order.order.status === Status.InPool && (
            <Chip color="default" avatar={<Avatar><HourglassEmptyIcon /></Avatar>} label={order.order.status} />
          )}
          {isMaster && order.order.status === Status.Accepted && (
            <Chip color="secondary" onClick={startOrder} label={'Начать'} />
          )}
          {isMaster && order.order.status === Status.InProgress && (
            <div className={classes.buttons}>
              <Chip color="default" onClick={addService} label={'Добавить услугу'} />
              <Chip className={classes.finish} onClick={finishOrder} label={'Завершить'} />
            </div>
          )}
          {isMaster && [Status.WaitingPayment, Status.Payed].indexOf(order.order.status as Status)!==-1 && (
            <div className={classes.buttons}>
              <Chip color="default" label={'Завершено'} />
            </div>
          )}


        </CardContent>

        <ExpansionPanel expanded={expanded === true} onChange={event => setExpanded(!expanded)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {expanded ? <Typography>Скрыть список услуг</Typography>
              : <Typography>Показать список услуг</Typography>
            }
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.services}>

            <PaymentsTable services={order.order.services} />

          </ExpansionPanelDetails>
        </ExpansionPanel>

      </Card>
    );
  };

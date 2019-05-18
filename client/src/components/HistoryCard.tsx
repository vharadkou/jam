import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
    }

  })

);
const fortamDate = (date:Date)=>{
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}
const objectsToArrays = (objects: any[]) =>
{
  return objects && [...objects].map((obj: any) => [obj.name, obj.count, obj.price]);
}

export const HistoryCard
  = ({ order }: {
    order:
    {
      date: any, name: string, services:
      { name: string, count: number, price: number }[]
    }
  }) =>
  {
    const classes = useStyles();

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
        
        </CardContent>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Показать список услуг</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.services}>

            <PaymentsTable headers={['Услуга','Кол.','Цена, р']} records={objectsToArrays(order.services)} />

          </ExpansionPanelDetails>
        </ExpansionPanel>

      </Card>

    );
  };


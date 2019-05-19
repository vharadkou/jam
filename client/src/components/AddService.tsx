import React, { useEffect, useState, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 40,
    },
    line: {
      display: 'flex',
      alignItems: 'center',
    }
  })
);

interface Service
{
  name: string;
  amount?: number;
  price?: number;
}

interface ServiceForState extends Service
{
  checked: boolean;
}

interface Props
{
  allServices: Service[],
  selectedServices: Service[];
  onSelect: any;
}

export const AddService = ({ allServices, selectedServices, onSelect }: Props) =>
{
  const classes = useStyles();

  const [servicesForState, setServicesForState] = useState<ServiceForState[]>([]);

  useEffect(() =>
  {
    setServicesForState(allServices.map(service =>
    {
      return {
        ...service,
        // checked: !!selectedServices.find(sService => sService.name === service.name)
        checked: false,
      }
    }))
  }, []);

  const handleCheck = (service: ServiceForState) => () =>
  {
    service.checked = !service.checked;
    setServicesForState([...servicesForState]);
    onSelect(servicesForState);
  };

  const handleAmount = (service: ServiceForState) => (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    service.amount = +event.target.value;
    setServicesForState([...servicesForState]);
    onSelect(servicesForState);
  }

  return (
    <div className={classes.root}>
      {servicesForState.map(service => (
        <>
          <span className={classes.line}>
            <FormControlLabel
              control={
                <Checkbox checked={service.checked} onChange={handleCheck(service)} value="checkedA" />
              }
              label={service.name}
            />
            <TextField
              id="standard-number"
              label="Number"
              value={service.amount}
              onChange={handleAmount(service)}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </span>
        </>
      ))}
    </div>
  );
};


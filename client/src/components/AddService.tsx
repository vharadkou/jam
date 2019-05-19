import React, { useEffect, useState, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 40,
    },
  })
);

interface Service {
  name: string;
  amount: number;
}

interface ServiceForState extends Service {
  checked: boolean;
}

interface Props {
  allServices: Service[],
  selectedServices: Service[];
}

export const AddService = ({ allServices, selectedServices }: Props) => {
  const classes = useStyles();

  const [servicesForState, setServicesForState] = useState<ServiceForState[]>([]);

  useEffect(() => {
    setServicesForState(allServices.map(service => {
      return {
        ...service,
        checked: !!selectedServices.find(sService => sService.name === service.name)
      }
    }))
  }, []);

  const handleCheck = (service: ServiceForState) => useCallback(() => {
    service.checked = !service.checked;
    setServicesForState([...servicesForState]);
  }, []);

  const handleAmount = (service: ServiceForState) => useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    service.amount = +event.target.value;
    setServicesForState([...servicesForState]);
  }, [])

  return (
    <div className={classes.root}>
      {servicesForState.map(service => (
        <>
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
        </>
      ))}
    </div>
  );
};


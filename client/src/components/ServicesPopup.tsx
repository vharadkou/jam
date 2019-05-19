import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from 'stores';
import { AddService } from './AddService';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  })

);

export const ServicesPopup
  = ({ selectedServices, onServicesAdd }) =>
  {
    const classes = useStyles();

    const { servicesStore } = useStore();
    const { services } = servicesStore

    useEffect(() =>
    {
      servicesStore.load('services')
    }, [])

    const [open, setOpen] = useState(
      false
    );

    const [pickedServices, setPickedServices] = useState(
      []
    );

    const handleClickOpen = () =>
    {
      setOpen(true)
    };

    const handleClose = () =>
    {
      setOpen(false)
    };

    const handleSave = () =>
    {
      setOpen(false);
      onServicesAdd(pickedServices);
    };

    const addServices = (allServices) =>
    {
      setPickedServices(allServices
        .filter(it => it.checked)
        .map((it) => { return { name: it.name, count: it.amount, price: it.price } })
      );
    }

return (
  <div>
    <Chip color="default" onClick={handleClickOpen} label={'Добавить услугу'} />
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Услуги
              </Typography>
          <Button color="inherit" onClick={handleSave}>
            Сохранить
              </Button>
        </Toolbar>
      </AppBar>

      <AddService allServices={services} selectedServices={selectedServices} onSelect={addServices} />

    </Dialog>
  </div>

);
  };


import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RequestData } from 'components/RequestData';
import { Value } from 'stores/categories.store';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const baseUnit = 2;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: baseUnit,
    },
    logo: {
      animation: 'App-logo-spin infinite 20s linear',
      height: '40vmin',
      pointerEvents: 'none',
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      opacity: 0.6,
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 32,
    },
    message: {
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: baseUnit * 8,
    },
    snackbar: {
      padding: baseUnit,
    },
    data: {
      padding: baseUnit,
    },
    closeButton: {
      marginLeft: theme.spacing(2),
      fontSize: 16,
      backgroundColor: theme.palette.primary.dark,
      color: '#FFFFFF',
    },
    action: {
      paddingTop: '8px',
    },
    button: {
      margin: theme.spacing(0.5)
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })
);

const ALL_WARNINGS_MESSAGES = [
  {
    messages: [
      'Гарантия на выполненые работы дается только на услуги в чеке, не забывайте включать все работы в чек',
      'Время и стоимость выполнения может увеличиться, если обнаружутся новые детали',
      'Если вы откажитесь от услуги менее чем за 4 часа до выполнения - с вас спишут 3р',
      'В момент заказа вы должны быть на месте ',
    ],
    isVisible: true,
    index: 0,
  },
];

export const CreateRequest = observer(({ match: { params: { categoryId } } }: any) => {
  const classes = useStyles();

  const { ordersStore, categoriesStore, authStore, routerStore } = useStore();

  const createDefalteData = () => {
    const { categories } = categoriesStore;

    let selectedRequestData: Value | undefined = undefined;

    if (categories) {
      const selectedCategoryIndex = categories
        .findIndex((category) => category.values !== undefined &&
          category.values.find((value) => value.id === categoryId) !== undefined);
      if (selectedCategoryIndex !== -1) {
        selectedRequestData = categories[selectedCategoryIndex].values
          .find((value) => value.id === categoryId);
      }
    }

    let preferredDate = new Date();
    preferredDate.setTime(preferredDate.getTime() + 4 * 3600 * 1000)

    return {
      requestName: {
        value: selectedRequestData ? selectedRequestData.data : selectedRequestData,
        cost: selectedRequestData ? selectedRequestData.cost : 3,
        disabled: true,
      },
      description: {
        disabled: false,
      },
      preferredTime: preferredDate,
      address: {
        disabled: false,
      },
      houseNumber: {
        disabled: false,
      }
    };
  }

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    categoriesStore.load('categories')
      .then(() => setRequestData(createDefalteData()));

    setTimeout(() => {
      setDrawerOpen(true);
    }, 500)
  }, [])

  const [warnings] = useState(ALL_WARNINGS_MESSAGES);
  const [requestData, setRequestData] = useState(createDefalteData());

  const addRow = useCallback(async () => {
    await ordersStore.addRow(
      requestData,
      authStore && authStore.user ? authStore.user.phoneNumber : null
    );

    routerStore.push('/user/history');
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <RequestData
          {...requestData}
          handleChange={(fieldName) => value => {
            let data = { ...requestData }
            data[fieldName] = value;
            setRequestData(data);
          }}
        />
      </div>
      <div className={classes.action}>
        <Button
          className={classes.closeButton}
          onClick={addRow}
        >
          Создать
        </Button>
      </div>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        {warnings.filter(w => w.isVisible)
          .map((warning, i) => (
            <div key={i} className={classes.warning}>
              <span className={classes.message}>
                <div className={classes.container}>
                  <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 1000, marginLeft: 38 }}>Внимание</Typography>
                  <IconButton className={classes.button} aria-label="Delete" onClick={() => setDrawerOpen(false)}>
                    <CloseIcon style={{ color: 'black' }} />
                  </IconButton>
                </div>
                <ul style={{ marginTop: 0 }}>{warning.messages.map((m, j) => (<li key={j}><Typography variant="body2">{m}</Typography></li>))}</ul>
              </span>
            </div>
          ))}
      </SwipeableDrawer>
    </div>
  );
});

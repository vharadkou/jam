import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RequestData } from 'components/RequestData';
import { Value } from 'stores/categories.store';

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

const hideWarning = (warnings, index, setWarnings) => {
  let newWarns = [...warnings];
  newWarns[index].isVisible = false;
  setWarnings(newWarns);
}

export const CreateRequest = observer(({ match: { params: { categoryId } } }: any) => {
  const classes = useStyles();

  const { ordersStore, categoriesStore, authStore } = useStore();

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

    return {
      requestName: {
        value: selectedRequestData ? selectedRequestData.data : selectedRequestData,
        disabled: true,
      },
      description: {
        disabled: false,
      },
      preferredTime: new Date('2019-05-19T21:11:54'),
    };
  }

  useEffect(() => {
    categoriesStore.load('categories')
      .then(() => setRequestData(createDefalteData()));
  }, [])

  const [warnings, setWarnings] = useState(ALL_WARNINGS_MESSAGES);
  const [requestData, setRequestData] = useState(createDefalteData());

  return (
    <div className={classes.root}>
      <div className="warning">
        {warnings.filter(w => w.isVisible)
          .map((warning, i) => (<div key={i} className={classes.snackbar}>
            <SnackbarContent
              className={classes.warning}
              message={(
                <span className={classes.message}>
                  <span style={{ textAlign: 'center' }}>Внимание</span>
                  <ul>{warning.messages.map((m, j) => (<li key={j}>{m}</li>))}</ul>
                </span>
              )}
              action={[
                <Button
                  key="close"
                  aria-label="Close"
                  variant="contained"
                  onClick={hideWarning.bind(null, warnings, warning.index, setWarnings)}
                >
                  <span>Закрыть</span>
                </Button>,
              ]}
            />
          </div>))}
      </div>
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
      <div className="action">
        <Button
          className={classes.closeButton}
          onClick={() => ordersStore.addRow(
            requestData,
            authStore && authStore.user ? authStore.user.phoneNumber : null
          )}
        >
          Создать
        </Button>
      </div>
    </div>
  );
});

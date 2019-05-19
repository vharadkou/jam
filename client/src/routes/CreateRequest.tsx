import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RequestData } from 'components/RequestData';

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

const hideWarning = (warnings, index, setWarnings) => {
  let newWarns = [...warnings];
  newWarns[index].isVisible = false;
  setWarnings(newWarns);
}

const defaultRequest = {
  requestName: {
    disabled: true,
  },
  description: {
    disabled: false,
  },
  preferredTime: new Date('2014-08-18T21:11:54'),
};

export const CreateRequest = observer(({ match: { params: { categoryId } } }: any) => {
  const classes = useStyles();

  const { ordersStore } = useStore();

  const [warnings, setWarnings] = useState(ALL_WARNINGS_MESSAGES);

  const [requestData, setRequestData] = useState(defaultRequest);

  return (
    <div className={classes.root}>
      <div className="warning">
        {
          warnings
            .filter(w => w.isVisible)
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
              ></SnackbarContent>
            </div>))
        }
      </div>
      <div className={classes.data}>
        <RequestData
          handleChange={(fieldName) => value => {
            let data = { ...requestData }
            data[fieldName] = value;
            setRequestData(data);
          }}
          {...requestData}
        ></RequestData>
      </div>
      <div className="action">
        <Button onClick={() => ordersStore.addRow(requestData)}>
          Создать
        </Button>
      </div>
    </div>
  );
});

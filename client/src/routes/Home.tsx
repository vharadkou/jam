import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { HomeCard } from 'components/HomeCard';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ListIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import HistoryIcon from '@material-ui/icons/History';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StarRateIcon from '@material-ui/icons/StarRate';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import { useStore } from 'stores';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    header: {
      minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100% - ${(theme.mixins.toolbar[theme.breakpoints.up('sm')] as CSSProperties).minHeight}px)`,
      },
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    card: {
      maxWidth: 140,
      maxHeight: 140,
      flex: '1 0 140px',
      margin: theme.spacing(1),
    },
  })
);

export const Home = observer(() => {
  const classes = useStyles();
  const { routerStore, authStore: { userData } } = useStore();

  const openCatalog = useCallback(() => {
    routerStore.push('/user/categories');
  }, [routerStore]);

  const openSearch = useCallback(() => {
    routerStore.push('/user/request/create/2f03c6f9-2efa-4e53-9161-2cdca6887eb6');
  }, [routerStore]);

  const openPopular = useCallback(() => {
    routerStore.push('/user/popular');
  }, [routerStore]);

  const openHistory = useCallback(() => {
    routerStore.push('/user/history');
  }, [routerStore]);

  const openSchedule = useCallback(() => {
    routerStore.push('/master/schedule');
  }, [routerStore]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.cards}>
          {userData.role === 'client' ? (
            <React.Fragment>
              <HomeCard className={classes.card} text='Популярные' image={WhatshotIcon} onClick={openPopular} />
              <HomeCard className={classes.card} text='Категории' image={ListIcon} onClick={openCatalog} />
              <HomeCard className={classes.card} text='Консультация' image={HelpIcon} onClick={openSearch} />
              <HomeCard className={classes.card} text='История' image={HistoryIcon} onClick={openHistory} />
              <HomeCard className={classes.card} text='Карта' image={CreditCardIcon} />
              <HomeCard className={classes.card} text='Профиль' image={AccountBoxIcon} />
            </React.Fragment>
          ) : (
              <React.Fragment>
                <HomeCard className={classes.card} text='Задачи' image={WhatshotIcon}  onClick={openSchedule}/>
                <HomeCard className={classes.card} text='График' image={CalendarTodayIcon}/>
                <HomeCard className={classes.card} text='Рейтинг' image={StarRateIcon} />
                <HomeCard className={classes.card} text='История' image={HistoryIcon} />
              </React.Fragment>
            )}
        </div>
      </header>
    </div>
  );
});



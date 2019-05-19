import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';
import { Value } from 'stores/categories.store';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    card: {
      margin: theme.spacing(1)
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
  })
);

export const Requests = observer(({ match: { params: { categoryName } } }: any) => {
  const classes = useStyles();
  const { categoriesStore, routerStore } = useStore();
  const { categories, isLoading } = categoriesStore

  useEffect(() => {
    if (!isLoading && categories === null) {
      categoriesStore.load('categories');
    }
  }, [categoriesStore, isLoading, categories])

  let requests: any = []
  if (!isLoading && categories !== null) {
    const selectedCategory = categories.find((category) => category.category === categoryName);
    requests = selectedCategory ? selectedCategory.values : [];
  }

  const handleClick = useCallback((categoryId: string) => {
    routerStore.push(`/user/request/create/${categoryId}`);
  }, [routerStore])

  return (
    <div className={classes.root}>
      {requests.map((request: Value) => (
        <Card
          key={request.id}
          className={classes.card}
        >
          <CardActionArea
            onClick={() => handleClick(request.id)}
          >
            <CardContent>
              <Typography variant="body2">{request.data}</Typography>
              <Divider className={classes.divider}/>
              <Typography variant="subtitle2">
                {`${request.cost} BYN`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
});

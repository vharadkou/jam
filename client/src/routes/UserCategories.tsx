import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Categories } from '../components/Categories'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
    },
  })
);

export const UserCategories = observer(() => {
  const classes = useStyles();
  const { categoriesStore, routerStore } = useStore();
  const { categories } = categoriesStore

  useEffect(() => {
    categoriesStore.load('categories')
  }, [])

  const handleClick = useCallback((categoryName: string) => {
    routerStore.push(`/user/requests/${categoryName}`);
  }, [routerStore])

  return (
    <div className={classes.root}>
      {categories && (
        <Categories
          categories={categories}
          onClick={handleClick}
        />
      )}
    </div>
  );
});

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Category as CategoryDate } from 'stores/categories.store';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    card: {
      margin: theme.spacing(1)
    }
  })
);

interface Props {
  categories: CategoryDate[],
  onClick: (category: string) => void,
}

export const Categories = ({ categories, onClick }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {categories.map((category: CategoryDate) => (
        <Card
          key={category.category}
          className={classes.card}
        >
          <CardActionArea onClick={() => onClick(category.category)}>
            <CardContent>
              <Typography>{category.category}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};


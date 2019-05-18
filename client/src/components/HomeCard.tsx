import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => createStyles({
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
}))

interface Props {
  className?: string;
  text: string;
  image: any;
  onClick?: () => void;
}

export const HomeCard = memo(({ className, text, image: Component, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Card className={className}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <div className={classes.cardContent}>
            <Component />
            <Typography variant="h6">{text}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
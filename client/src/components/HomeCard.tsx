import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    media: {
      height: 140,
    },
  })
);

interface Props {
  className?: string;
  text: string;
  image: any;
  onClick?: () => void;
}

export const HomeCard = memo(({ className, text, image:Component, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Card className={className}>
      <CardActionArea onClick={onClick}>
        {/* <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
          <Component />
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
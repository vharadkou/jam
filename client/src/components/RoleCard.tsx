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
    text: {
      textAlign: 'center',
    }
  })
);

interface Props {
  className?: string;
  text: string;
  image: string;
  onClick?: () => void;
}

export const RoleCard = memo(({ className, text, image, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Card className={className}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
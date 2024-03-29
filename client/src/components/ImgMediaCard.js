import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {  Avatar } from "@material-ui/core";


const useStyles = makeStyles({
});

export default function ImgMediaCard({profile, authorName}) {
  console.log(profile);
  const imgSrc = `http://localhost:4000/${profile}`;
  console.log(imgSrc);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="user profile"
          height="140"
          image={imgSrc}
          title="user profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {authorName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

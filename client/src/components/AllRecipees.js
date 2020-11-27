import React from "react";
import { gql, useQuery } from '@apollo/client';
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Avatar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import FAB from "./FAB";
import "./AllRecipees.css";

const useStyles = makeStyles((theme) => ({
  recipeeContainer: {
    paddingTop: theme.spacing(3),
  },
  title: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    textDecoration: "none",
  },
  media: {
    height: 240,
  },
  CardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}));


//Graphql query
const RECIPEES_QUERY = gql`
  query RecipeesQuery {
    recipees {
      id
      author
      recipee
      description
      ingredients
      procedure
      tags
      photo
      profile
      createdAt
      updatedAt
    }
  }`;



export default function AllRecipees(props) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(RECIPEES_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <Container maxWidth="lg" className={classes.recipeeContainer}>
            <Typography variant="h4" className={classes.title}>
                Recipees
            </Typography>
            <Grid container spacing={3}>
            {
                data.recipees.map(recipee => {
                    let image = "http://localhost:4000/"+recipee.photo;
                    let profile = "http://localhost:4000/"+recipee.profile;
                    return(
                        <Grid item xs={12} sm={6} md={4} key={recipee.id}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {recipee.recipee}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {recipee.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className={classes.CardActions}>
                                    <Box className={classes.author}>
                                        <Avatar src={profile}></Avatar>
                                        <Box ml={2}>
                                            <Typography variant="subtitle2" component="p">
                                                {recipee.author}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {recipee.updatedAt}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Link to={`/detailedRecipee/${recipee.id}`}>
                                        <Box>
                                            <KeyboardArrowRightIcon />
                                        </Box>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
    
                })
            }
            </Grid>
            <Link to="/postRecipee">
                <div className="fab">
                    <FAB />
                </div>
            </Link>
        </Container>
  );
}

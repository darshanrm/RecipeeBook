import React, { useState } from "react";
import "./AuthorRecipeeCarousel.css";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./ImgMediaCard";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";

//Graphql query
const RECIPEES_BY_AUTHOR_QUERY = gql`
  query RecipeesByAuthorQuery($authorName: String!) {
    recipeesByAuthor(authorName: $authorName) {
      author
      recipee
      description
      photo
    }
  }
`;

function AuthorRecipeeCarousel({ authorName }) {
  const { loading, error, data } = useQuery(RECIPEES_BY_AUTHOR_QUERY, {
    variables: { authorName },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Typography>
        <br />
        <br />
        <br />
        <h3>Other Recipees By This Author</h3>
      </Typography>
      <Grid container spacing={3}>
        {data.recipeesByAuthor.map((recipee) => {
          let image = recipee.photo;
          return (
            <Grid item xs={12} sm={12} md={4}>
              <ImgMediaCard profile={image} authorName={authorName} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AuthorRecipeeCarousel;

import React from "react";
import "./UICard.css";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./ImgMediaCard";
import SimpleTabs from "./SimpleTabs";
import { gql, useQuery } from "@apollo/client";
import AuthorRecipeeCarousel from "./AuthorRecipeeCarousel";

//Graphql query
const RECIPEE_QUERY = gql`
  query RecipeeQuery($id: String!) {
    recipee(id: $id) {
      author
      recipee
      description
      ingredients
      procedure
      photo
      profile
      createdAt
      updatedAt
    }
  }
`;
function UICard(props) {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery(RECIPEE_QUERY, {
    variables: { id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const imgSrc = "http://localhost:4000/" + data.recipee.photo;
  return (
    <div>
      <img className="home_image" src={imgSrc} alt=""></img>
      <h1>{data.recipee.recipee}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <SimpleTabs
            description={data.recipee.description}
            ingredients={data.recipee.ingredients}
            procedure={data.recipee.procedure}
            updatedAt={data.recipee.updatedAt}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <ImgMediaCard
            profile={data.recipee.profile}
            authorName={data.recipee.author}
          />
        </Grid>
      </Grid>
      <Grid container>
        <AuthorRecipeeCarousel authorName={data.recipee.author} />
      </Grid>
    </div>
  );
}

export default UICard;

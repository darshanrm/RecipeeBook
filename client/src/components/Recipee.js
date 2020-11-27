import React from "react";
import "./Recipee.css";
import { gql, useQuery } from '@apollo/client';

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
  }`;

function Recipee({ id }) {
  const { loading, error, data } = useQuery(RECIPEE_QUERY, { variables: {id}});
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
            <div className="product">
              <div className="product_info">
                <p className="title">{data.recipee.title}</p>
                <p className="bold-text">Ingredients:</p>
                  {data.recipee.ingredients.map((_, i) => (
                    <p>
                      {i + 1} {data.recipee.ingredients[i]}
                    </p>
                  ))}
                <p className="bold-text">procedure:</p>
                <p>{data.recipee.procedure}</p>
                <p className="author">By- {data.recipee.author}</p>
              </div>
            </div>
            
          );
}

export default Recipee;

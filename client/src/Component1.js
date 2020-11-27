import React from 'react'
import { gql, useQuery } from '@apollo/client';

const GET_LAUNCHES = gql`
  query Launches {
    launches {
      cursor
      hasMore
    }
  }
`;


function Component1() {
    const { loading, error, data } = useQuery(GET_LAUNCHES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.launches);
    return (
        <div>
            <h1>Hello Component1</h1>
        </div>
    )
}

export default Component1

import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../Error";
import Loading from "../Loading";

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      username
    }
  }
`;


function CurrentUser(props){

    return (
      <Query query={GET_CURRENT_USER_QUERY}>
        {(result) => {
          const { data, error, loading } = result;

          if (error) return <Error error={error} />;
          if (loading) return <Loading />;

          return props.children(data.me);

        }}
      </Query>
    );

}

export default CurrentUser;
export { GET_CURRENT_USER_QUERY };

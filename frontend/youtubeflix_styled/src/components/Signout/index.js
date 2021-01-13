import React from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

import Button from '../Button'

function Signout(props){
  const handleClick = () => {
    localStorage.removeItem("auth-token");

    props.client.resetStore();

    props.history.push("/");
  };


    return (
      <Button onClick={handleClick}>
        Sign Out
      </Button>
    );

}

export default withRouter(withApollo(Signout));

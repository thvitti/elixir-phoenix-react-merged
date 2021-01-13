import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Error from "../Error";
import Loading from "../Error";
import FormField from "../FormField";
import Button from "../Button";
import { GET_CURRENT_USER_QUERY } from "../CurrentUser";

const SIGNIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

class SigninForm extends Component {
  state = {
    username: "user",
    password: "123456"
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  isFormValid = event => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  };

  handleCompleted = data => {
    localStorage.setItem("auth-token", data.signin.token);

    this.props.history.push("/")
  };

  handleUpdate = (cache, { data }) => {
    cache.writeQuery({
      query: GET_CURRENT_USER_QUERY,
      data: { me: data.signin.user }
    });
  };

  handleError = () => {

  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        onCompleted={this.handleCompleted}
        update={this.handleUpdate}
        onError={this.handleError}
        >
        {(signin, { error, loading }) => {
          if (loading) return <Loading />;
          return (
            <form
              className="signin"
              onSubmit={e => {
                e.preventDefault();
                signin();
              }}>
              <h2>Sign In</h2>
              <h3>
                <Link to="/sign-up">Need an account?</Link>
              </h3>
              <Error error={error} />
              <fieldset>

              <FormField
                label="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

                <Button type="submit" disabled={!this.isFormValid()}>
                  Log In
                </Button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(SigninForm);

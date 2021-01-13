import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";


const GET_QUERY = gql`
  query GetAllCategoriesCombo{
  categories{
    id
    title
    color
  }
}
`;
class CategoryList extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  render() {

      return (<Query query={GET_QUERY}>
        { ( result) => {

          const { data, loading, error } = result
          if (loading) return (<div>loading </div>);
          if (error) return (<div>Error ${error.message}</div>);
          
          return this.props.children(data.categories);
        }}
      </Query>
    );
  }
}

export default CategoryList;
export { GET_QUERY };

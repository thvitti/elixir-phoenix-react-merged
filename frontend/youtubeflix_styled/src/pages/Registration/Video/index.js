/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import CategoryList from '../../../components/CategoryList';
import useForm from '../../../hooks/useForm';

import gql from "graphql-tag";
import { Mutation } from "react-apollo"

import { GET_CATEGORIES_WITH_VIDEOS_QUERY } from '../../Home';

function VideoRegistration() {

  const CREATE_VIDEO_QUERY = gql`
    mutation CreateVideo(
      $title: String!,
      $url: String!,
      $category: String!,
      $categoryId: ID!) {
    createVideo(
        title: $title,
        url: $url,
        category: $category,
        categoryId: $categoryId){
        categoryId
        id
        title
        url
      }
    }

  `;


  const history = useHistory({});

    const initialVideo = {
      title: 'titulo teste',
      url: 'url teste',
      category: ''

  };
  const { handleChange, values } = useForm(initialVideo);

  const handleCompleted = (data) => {

  }

  const handleUpdate = () => {
    history.push("/");
  }

  const handleSubmit = (event, createVideo, categories) => {

    event.preventDefault();
    const categorySelected = categories.find((category) =>
    category.title === values.category);

    if(!categorySelected){
      return;
    }




    const theVariables = {
      ...values,
      categoryId: categorySelected.id
    };

    createVideo({ variables: theVariables });


  };



  return (

        <CategoryList>
          {categories => (
            <>
    <Mutation mutation={CREATE_VIDEO_QUERY}
              onCompleted={handleCompleted}
              update={handleUpdate}
              refetchQueries={[{query: GET_CATEGORIES_WITH_VIDEOS_QUERY}]}
              >
    {(createVideo, { loading, error }) => {
    return (<PageDefault>

      <h1>Video Registration</h1>
           <form onSubmit={(e) => { handleSubmit(e, createVideo, categories)}}
      >

        <FormField
          label="Video Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Category "
          type="text"
          name="category"
          value={values.category}
          onChange={handleChange}
          suggestions={categories}
        />


        <Button type="submit">
          Create
        </Button>

      </form>




    </PageDefault>)
    }}
    </Mutation>
    </>
  )}
    </CategoryList>
  );
}

export default VideoRegistration;

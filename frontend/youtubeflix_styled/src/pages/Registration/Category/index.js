/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
// import categoriesRepository from '../../../repositories/categories';

import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import CategoryList, { GET_QUERY } from '../../../components/CategoryList';
import Error from '../../../components/Error';


const CREATE_CATEGORY_QUERY = gql`
  mutation CreateCategory(
      $title: String!,
      $color: String!,
      $extraUrl: String,
      $extraText: String) {
    createCategory(
      title: $title,
      color: $color,
      extra_url: $extraUrl,
      extra_text: $extraText){
        id
        title
        color
        extra_url
        extra_text
    }

  }

`;


const Span = styled.span`
  color: red;
  // border: 1px solid var(--white);
  padding: 0px;
  font-size: 16px;
`;

export const Title = styled.li`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 1;
  margin-bottom: 16px;
  margin-right: 5px;
  display: inline-block;
  padding: 10px;
  background: #11F420;
  line-height: 1;
  border-radius: 4px;

  @media (max-width: 800px) {
    font-size: 18px;
    padding: 10px;
  }
`;

function validate(values) {
  const errors = { isEmpty: true };

  if(!values.title){
    errors.categoryTitle = '[Category title is required]';
    errors.isEmpty = false;
  }

  if(values.title.length < 2){
    errors.categoryTitle = '[Category title size higher than 2]';
    errors.isEmpty = false;
  }

  if(!values.description){
    errors.categoryDescription = '[Category description is required]';
    errors.isEmpty = false;
  }

  return errors;
}

function CategoryRegistration() {

  const history = useHistory({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const initial = {
    title: '',
    description: '',
    color: '#107ef4',
    extra_text: '',
    extra_url: '' ,
  };


  const { values, handleChange, clearForm } = useForm(initial);

  const handleOnBlur = (e) => {

    setTouched(true);
    setErrors(validate(values));


  };

  const handleSubmit = (event, createCategory) => {

    event.preventDefault();

    setErrors(validate(values));



    if (errors.isEmpty) {
      createCategory();
    }
    else{
      return;
    }

  }

  const handleCompleted = () => {

    clearForm();
    history.push("/registration/category");
  }

  const onError = (error) => {
    console.log(error);
  }



  return (


      <Mutation
                mutation={CREATE_CATEGORY_QUERY}
                variables={values}
                onCompleted={handleCompleted}
                refetchQueries={[{query: GET_QUERY}]}
                onError={onError}
                >
      { (createCategory, result ) => {

        const { loading, error} = result

        if (loading) return (<div>Loading</div>);

        return (<PageDefault>

      <h1>
        Category Registration
      </h1>
      <h2>
        <p>Preview: </p>
        <Title style={{ backgroundColor: values.color || 'red' }}> {values.title} </Title>
      </h2>

      { (error && <Error error={error} />)}

      <form onSubmit={(e) => { handleSubmit(e, createCategory)}}>
        <FormField
          label="Category Title "
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />

        { touched && errors.categoryTitle && <Span>{errors.categoryTitle}</Span>}

        <FormField
          label="Description"
          type="textarea"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        { touched && errors.categoryDescription && <Span>{errors.categoryDescription}</Span>}

        <FormField
          label="Color"
          type="color"
          name="color"
          value={values.color}
          onChange={handleChange}
        />

        <Button type="submit">
          Add
        </Button>

      </form>
        <br/>
        <hr/>
        <h3>Current categories</h3>
        <CategoryList>
        {
          categories => (<ul>
            {categories.map((category, idx) => (
              <Title key={`${category}${idx}`}
                  style={{ backgroundColor: category.color || 'red' }}>
                {category.title}

              </Title>
            )
            )}
          </ul>)
        }
      </CategoryList>

      <Link to="/">
        Ir para Home
      </Link>
        </PageDefault>)
      }}
      </Mutation>

  );
}

export default CategoryRegistration;

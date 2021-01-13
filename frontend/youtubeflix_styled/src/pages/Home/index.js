/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';

import gql from "graphql-tag";
import { Query } from "react-apollo"

const GET_CATEGORIES_WITH_VIDEOS_QUERY = gql`
    query GetAllCategoriesWithVideos{
    categories{
      id
      title
      color
      extraText
      extraUrl
      videos{
        id
        categoryId
        title
        url
        user{
          username,
          email
        }
      }
    }
  }
`;
const AppWrapper = styled.div`
  background: var(--grayDark);

  padding-top: 94px;

  @media(max-width: 800px){
    padding-top: 70px;
  }
`;


function Home() {
  return (<Query query={GET_CATEGORIES_WITH_VIDEOS_QUERY}>
    { ( result) => {
      const { data, loading, error } = result
      if (loading) return (<div>Loading</div>);
      if (error) return (<div>Error ${error.message}</div>);

      return (
          <AppWrapper >
          <PageDefault paddingAll={0}  >
                  {data.categories.map((category, index) => {

              if (index === 0 && category.videos.length > 0) {

                return (
                  <div key={category.id}>
                    <BannerMain
                      videoTitle={category.videos[0].title}
                      url={category.videos[0].url}
                      videoDescription=""
                    />

                    <Carousel ignoreFirstVideo category={category}
                    />

                  </div>
                );
              }

              return (
                <Carousel key={category.id} category={category} />
              );
            })}

          </PageDefault>
          </AppWrapper>
      );
    }}
  </Query>)
}

export default Home;
export { GET_CATEGORIES_WITH_VIDEOS_QUERY }

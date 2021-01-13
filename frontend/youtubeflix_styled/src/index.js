import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';


import Home from './pages/Home';
import Signin from './pages/Signin';
import CategoryRegistration from './pages/Registration/Category';
import VideoRegistration from './pages/Registration/Video';
import Page404 from './pages/Page404';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import { ApolloProvider } from "react-apollo";
import client from "./client";

ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
    <Switch>
      <Route path="/sign-in" component={Signin} />
      <Route path="/registration/video" component={VideoRegistration} />
      <Route path="/registration/category" component={CategoryRegistration} />
      <Route path="/" component={Home} exact />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

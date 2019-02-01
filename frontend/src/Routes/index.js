import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage, BlogPage, PostPage, AddPostPage, LoginPage } from '../Pages';
import '../styles/common.scss';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from '../styles/theme';


const AppRouter = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/post/:id" exact component={PostPage} />
        <Route path="/post/edit/:id" exact component={AddPostPage} />
        <Route path="/add-post" component={AddPostPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export { AppRouter };

import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomePage, BlogPage, PostPage, AddPostPage, LoginPage, AboutMePage } from '../Pages';
import '../styles/common.scss';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from '../styles/theme';


const AppRouter = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/blog/:category" component={BlogPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/post/:id" exact component={PostPage} />
        <Route path="/post/edit/:id" exact component={AddPostPage} />
        <Route path="/add-post" component={AddPostPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/about-me" component={AboutMePage} />
        <Redirect from="*" to="/blog" />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export { AppRouter };

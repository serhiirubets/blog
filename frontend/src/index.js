import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./Routes";
import { setContext } from 'apollo-link-context';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";



const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4444/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link)
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById("root")
);

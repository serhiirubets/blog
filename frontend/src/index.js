import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./Routes";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
const { createUploadLink } = require('apollo-upload-client')

const cache = new InMemoryCache();
const link = new createUploadLink({
  uri: "http://localhost:4444/graphql"
});
const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById("root")
);

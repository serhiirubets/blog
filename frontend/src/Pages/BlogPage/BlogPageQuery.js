import gql from "graphql-tag";

export const GET_POSTS = gql`
    query {
        getPosts {
          id
          title
          imageUrl
          category
          createdAt
          text
        }
    }
`
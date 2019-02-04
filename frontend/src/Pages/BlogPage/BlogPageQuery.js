import gql from "graphql-tag";

export const GET_POSTS = gql`
    query($category: String) {
        getPosts(category: $category) {
          id
          title
          imageUrl
          category
          createdAt
          text
        }
    }
`
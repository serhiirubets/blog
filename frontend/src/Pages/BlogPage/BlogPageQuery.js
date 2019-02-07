import gql from "graphql-tag";

export const GET_POSTS = gql`
    query($category: String, $offset: Int, $limit: Int) {
        getPosts(category: $category, offset: $offset, limit: $limit) {
          id
          title
          imageUrl
          category
          createdAt
          text
        }
    }
`
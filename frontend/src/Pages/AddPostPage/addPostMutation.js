import gql from "graphql-tag";

export const ADD_POST = gql`
  mutation($title: String!, $imageUrl: String, $category: String!, $text: String!) {
    addPost(title: $title, imageUrl: $imageUrl, category: $category, text: $text) {
      id
      title
      text
      category
      imageUrl
    }
  }
`;
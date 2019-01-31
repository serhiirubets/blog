import gql from "graphql-tag";

export const FILE_UPLOAD = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

export const ADD_POST = gql`
  mutation(
    $title: String!
    $imageUrl: String
    $category: String!
    $text: String!
  ) {
    addPost(
      title: $title
      imageUrl: $imageUrl
      category: $category
      text: $text
    ) {
      id
      title
      text
      category
      imageUrl
    }
  }
`;

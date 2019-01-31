import gql from "graphql-tag";
import { fragments } from '../../fragments';

export const ADD_POST = gql`
  mutation($title: String!, $imageUrl: String, $category: String!, $text: String!) {
    addPost(title: $title, imageUrl: $imageUrl, category: $category, text: $text) {
      ...PostCommon
    }
  }
  ${fragments.post}
`;
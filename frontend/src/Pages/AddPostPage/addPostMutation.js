import gql from "graphql-tag";
import { fragments } from '../../fragments';

export const ADD_POST = gql`
  mutation($id: ID, $title: String!, $imageUrl: String, $category: String!, $text: String!) {
    addPost(title: $title, imageUrl: $imageUrl, category: $category, text: $text, id: $id) {
      ...PostCommon
    }
  }
  ${fragments.post}
`;
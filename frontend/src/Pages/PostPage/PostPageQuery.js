import gql from 'graphql-tag';
import { fragments } from '../../fragments';

export const GET_POST = gql`
  query($id: ID!) {
    getPost(id: $id) {
      ...PostCommon
      likes
      comments {
        id
        username
        text
      }
    }
  }
  ${fragments.post}
`;

export const ADD_COMMENT = gql`
  mutation($postId: ID!, $username: String!, $text: String!) {
    addComment(postId: $postId, username: $username, text: $text) {
      username
      text
    }
  }
`
import gql from 'graphql-tag';

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation($id: ID!) {
    likePost(id: $id) {
      id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation($id: ID!) {
    unlikePost(id: $id) {
      id
    }
  }
`;

export const ADD_POST_COMMENT = gql`
  mutation($postId: ID!, $username: String!, $text: String!) {
    addPostComment(postId: $postId, username: $username, text: $text) {
      id
      postId
      username
      text
    }
  }
`;
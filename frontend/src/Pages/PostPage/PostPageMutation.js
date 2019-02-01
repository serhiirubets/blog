import gql from 'graphql-tag';

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
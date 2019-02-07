import gql from 'graphql-tag';
import { fragments } from '../../fragments';

export const GET_POST = gql`
  query($id: ID!) {
    getPost(id: $id) {
      ...PostCommon
      likes
    }
  }
  ${fragments.post}
`;

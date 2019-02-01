import gql from 'graphql-tag';

export const fragments = {
  post: gql`
    fragment PostCommon on Post {
      id
      title
      text
      category
      imageUrl
      createdAt
    }
  `,
}
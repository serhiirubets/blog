
const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
   type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }

  type Post {
    id: ID
    title: String!
    imageUrl: String!
    category: String!
    text: String!
    likes: Int
    views: Int
  }

  type User {
    id: ID
    username: String!
    password: String!
    email: String!
    imageUrl: String
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
    getPosts: [Post]
  }

  type Mutation {
    addPost(title: String!, imageUrl: String, text: String!, category: String!, username: String): Post
    updatePost(id: ID!, title: String!, imageUrl: String!, description: String!, category: String!): Post
    likePost(id: ID!): Post
    unlikePost(id: ID!): Post
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
    deletePost(_id: ID!): Post

    singleUpload(file: Upload!): File!
  }
`

exports.typeDefs = `
  type Post {
    id: ID
    name: String!
    imageUrl: String
    category: String!
    description: String!
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
  }

  type Mutation {
    addPost(name: String!, imageUrl: String!, description: String!, category: String!, username: String): Post
    updatePost(id: ID!, name: String!, imageUrl: String!, description: String!, category: String!): Post
    likePost(id: ID!): Post
    unlikePost(id: ID!): Post
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
    deletePost(_id: ID!): Post
  }
`

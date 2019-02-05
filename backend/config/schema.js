exports.typeDefs = `
  type Post {
    id: ID
    title: String!
    imageUrl: String
    category: String!
    createdAt: String
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
    getPosts(category: String, offset: Int, limit: Int): [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    addPost(id: ID, title: String!, imageUrl: String, text: String!, category: String!, username: String): Post
    likePost(id: ID!): Post
    unlikePost(id: ID!): Post
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
    deletePost(id: ID!): Post
  }
`

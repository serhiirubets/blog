const authResolvers = require('../resolvers/auth')
const postResolvers = require('../resolvers/post')
const postCommentResolvers = require('../resolvers/postComment')
const userResolvers = require('../resolvers/user')

exports.resolvers = {
  Query: {
    ...postResolvers.queries,
    ...authResolvers.queries,
    ...userResolvers.queries
  },
  Mutation: {
    ...authResolvers,
    ...postResolvers.mutations,
    ...postCommentResolvers.mutations
  }
}

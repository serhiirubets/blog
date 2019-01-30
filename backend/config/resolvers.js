const authResolvers = require('../resolvers/auth')
const postResovers = require('../resolvers/post')

exports.resolvers = {
  Query: {
    ...postResovers.queries
  },
  Mutation: {
    ...authResolvers,
    ...postResovers.mutations
  }
}

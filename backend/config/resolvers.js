const authResolvers = require('../resolvers/auth')

exports.resolvers = {
  Query: {},
  Mutation: {
    ...authResolvers
  }
}

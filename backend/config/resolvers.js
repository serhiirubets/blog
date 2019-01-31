const authResolvers = require('../resolvers/auth')
const postResovers = require('../resolvers/post')

exports.resolvers = {
  Query: {
    ...postResovers.queries
  },
  Mutation: {
    ...authResolvers,
    ...postResovers.mutations,
    singleUpload: async (parent, { file }) => {
      const { stream, filename, mimetype, encoding } = await file
      console.log(stream)
      console.log(filename)
      return { filename, mimetype, encoding }
    }
  }
}

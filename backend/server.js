const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { graphqlUploadExpress } = require('graphql-upload')

const { ApolloServer } = require('apollo-server-express')

// For graphql schema
const { typeDefs } = require('./config/schema')
const { resolvers } = require('./config/resolvers')

// Mongo models
const User = require('./models/User')
const Post = require('./models/Post')

require('dotenv').config()
require('./config/db-connection')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: '*'
  })
)

app.use('/graphql', bodyParser.json(), graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET)
      req.currentUser = currentUser
    } catch (error) {
      console.error('Token was not provided')
    }
  }

  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  context: ({ currentUser }) => ({ User, Post, currentUser })
})

server.applyMiddleware({ app })

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

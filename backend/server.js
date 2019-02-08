const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server-express')

// For graphql schema
const { typeDefs } = require('./config/schema')
const { resolvers } = require('./config/resolvers')

// Mongo models
const User = require('./models/User')
const Post = require('./models/Post')
const PostComment = require('./models/PostComment')

require('dotenv').config()
require('./config/db-connection')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: '*'
  })
)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
  context: ({ req }) => ({ User, Post, PostComment, currentUser: req.currentUser })
})

require('./api/fileUpload')(app)

server.applyMiddleware({ app })

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

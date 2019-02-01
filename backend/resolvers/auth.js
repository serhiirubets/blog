const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
  const { email } = user

  return jwt.sign(
    {
      email
    },
    secret
  )
}

const signupUser = async (root, { username, email, password }, { User }) => {
  const user = await User.findOne({ username })

  if (user) {
    throw new Error('User already exists')
  }

  await new User({
    username,
    email,
    password
  }).save()

  return { token: createToken({ email }, process.env.SECRET, '1h') }
}

const signinUser = async (root, { email, password }, { User }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  console(user.password)
  if (user.password !== password) {
    throw new Error('Invalid password')
  }

  // const isValidPassword = await bcrypt.compare(password, user.password)

  // if (!isValidPassword) {
  //   throw new Error('Invalid password')
  // }

  return { token: createToken(user, process.env.SECRET, '1hr') }
}

module.exports = { signinUser, signupUser }

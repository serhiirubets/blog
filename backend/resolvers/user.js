const getCurrentUser = (root, attrs, { currentUser, User }) => {
  if (!currentUser) {
    return null
  }
  return User.findOne({ email: currentUser.email })
}

module.exports = {
  queries: {
    getCurrentUser
  }
}

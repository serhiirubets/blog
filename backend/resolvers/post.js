const getPosts = (_, __, { Post }) => {
  return Post.find()
}

const addPost = (root, attrs, { Post }) => {
  return Post.create(attrs)
}

module.exports = {
  queries: {
    getPosts
  },
  mutations: {
    addPost
  }
}

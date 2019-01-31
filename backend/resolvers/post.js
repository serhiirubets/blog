const getPosts = (_, __, { Post }) => {
  return Post.find()
}

const getPost = (_, { id }, { Post }) => {
  console.log(id)
  return Post.findById(id)
}

const addPost = (root, attrs, { Post }) => {
  return Post.create(attrs)
}

module.exports = {
  queries: {
    getPosts,
    getPost
  },
  mutations: {
    addPost
  }
}

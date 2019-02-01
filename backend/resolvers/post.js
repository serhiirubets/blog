const getPosts = (_, __, { Post }) => {
  return Post.find()
}

const getPost = (_, { id }, { Post }) => {
  return Post.findById(id)
}

const addPost = async (root, attrs, { Post }) => {
  if (attrs.id) {
    const post = await Post.findOneAndUpdate(
      { _id: attrs.id },
      { $set: attrs },
      { new: true }
    )

    return {
      title: post.title,
      text: post.text,
      category: post.category,
      createdAt: post.createdAt,
      id: post.id
    }
  }
  const post = new Post(attrs)

  await post.save()
  return {
    title: post.title,
    text: post.text,
    category: post.category,
    createdAt: post.createdAt,
    id: post.id
  }
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

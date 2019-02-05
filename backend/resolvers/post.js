const getPosts = async (_, { category, offset = 0, limit }, { Post }) => {
  const posts = await Post.find().sort({ createdAt: -1 })
  let postsForShow = [...posts]
  if (category) {
    postsForShow = posts.filter(item => item.category === category)
  }

  return postsForShow.slice(offset, limit || postsForShow.length)
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

const deletePost = async (root, attrs, { Post }) => {
  const { id } = attrs

  if (!id) {
    return null
  }

  const post = await Post.findOneAndDelete({ _id: id })

  return {
    id: post._id
  }
}

module.exports = {
  queries: {
    getPosts,
    getPost
  },
  mutations: {
    addPost,
    deletePost
  }
}

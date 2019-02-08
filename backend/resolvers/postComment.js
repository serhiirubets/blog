const addPostComment = async (_, { postId, username, text }, { PostComment, Post }) => {
  const comment = await PostComment.create({
    username,
    postId,
    text
  })

  await Post.findOneAndUpdate({ _id: postId }, {
    $push: { comments: comment._id }
  })

  return comment
}

module.exports = {
  mutations: {
    addPostComment
  }
}

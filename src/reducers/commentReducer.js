import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_COMMENTS':
    return action.data
  case 'NEW_COMMENT':
    return [...state, action.data]
  default: return state
  }
}

export const initializeComments = (blog) => {
  return async dispatch => {
    const listOfComments = await blogsService.getComments(blog.id)
    dispatch({
      type: 'INIT_COMMENTS',
      data: listOfComments,
    })
  }
}

export const createComment = (comment) => {
  return async dispatch => {
    const newBlog = await blogsService.createNewComment(comment)
    console.log(newBlog + 'newBlog')
    console.log(newBlog.id + 'newBlog.id')
    dispatch({
      type: 'NEW_COMMENT',
      data: newBlog,
    })
  }
}

export default reducer
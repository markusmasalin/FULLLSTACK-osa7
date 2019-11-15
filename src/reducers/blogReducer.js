import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKED':
    return state.map(a =>
      a.id !== action.id ? a : action.data
    ).sort((a, b) => b.votes -  a.votes)
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data


  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    const a = blogs.sort((a, b) => b.likes -  a.likes)
    console.log(a)
    dispatch({
      type: 'INIT_BLOGS',
      data: a,
    })
  }
}

export const liked = (likedBlog) => {
  const newLike = {
    ...likedBlog,
    likes: (likedBlog.likes +1)
  }
  return async dispatch => {
    const updatedBlog = await blogsService.update(newLike)
    dispatch({
      type: 'LIKED',
      data: updatedBlog,
      id: likedBlog.id
    })
  }
}

export const createBlog = (data) => {
  console.log(data)
  return async dispatch => {
    const newBlog = await blogsService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}



export default reducer
import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.payload
    case 'ADD_LIKES':
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload.id)
    default:
      return state
  }
}

// ACTION CREATORS
export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((blog1,blog2) => blog2.likes - blog1.likes)
    dispatch({
      type: 'GET_BLOGS',
      payload: sortedBlogs
    })
  }
}

export const addLikes = likedBlog => {
  return async dispatch => {
    const response = await blogService.update(likedBlog)
    dispatch({
      type: 'ADD_LIKES',
      payload: response.data
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      payload: blog
    })
  }
}
export default blogsReducer
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { addLikes, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [view, setView] = useState(false)

  const handleView = () => setView(!view)

  const handleLike = () => {
    const editedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      userId: blog.userId.id
    }
    dispatch(addLikes(editedBlog))
  }

  const handleRemove = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    blogService.setToken(user.token)

    const response = window.confirm(`Remove ${blog.title} by ${blog.author}`)
      ? dispatch(deleteBlog(blog))
      : 'operation cancelled'
    return response
  }

  return (
    <div className='blog'>
      {blog.title} <button id='blog-view-button' onClick={handleView}>{view ? 'hide' : 'view'}</button>
      {
        view
          ? <div>
            <div>
              {blog.url}
            </div>
            <div>
              {blog.likes}
              <button id='blog-like-button' onClick={handleLike}>like</button>
            </div>
            <div>
              {blog.author}
            </div>
            {
              JSON
                .parse(window.localStorage.getItem('user'))
                .username === blog.userId.username
                ? <button id='blog-remove-button' onClick={handleRemove}>remove</button>
                : null
            }
          </div>
          : null
      }
    </div>
  )
}

export default Blog
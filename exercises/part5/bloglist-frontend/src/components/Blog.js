import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleView = () => setView(!view)

  const handleLike = async () => {
    const editedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      url: blog.url,
      userId: blog.userId.id
    }

    setLikes(likes + 1)
    await blogService.update(editedBlog)
  }

  const handleRemove = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    blogService.setToken(user.token)

    const response = window.confirm(`Remove ${blog.title} by ${blog.author}`)
      ? await blogService.remove(blog)
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
              {likes}
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
import React from 'react'
import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  return(
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel='create'>
        <CreateNewBlog/>
      </Togglable>

      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )
}

export default Blogs
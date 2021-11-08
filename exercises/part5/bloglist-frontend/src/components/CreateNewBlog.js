import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogMessage = ({ message }) => {
  const style = {
    backgroundColor: 'grey',
    border: 'solid 2px',
    borderColor: message.includes('Trouble') ? 'red' : 'green',
    borderRadius: 3,
    color: message.includes('Trouble') ? 'red' : 'green' ,
    padding: 5
  }
  return(
    <div style={style}>
      {message}
    </div>
  )
}


const CreateNewBlog = () => {
  // STATE: Create New Blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [newBlogMsg, setNewBlogMsg] = useState('')

  // EVENT HANDLING: Create New Blog
  const handleCreateNewBlog = async (event) => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('user'))
    blogService.setToken(loggedInUser.token)
    event.preventDefault()
    try {
      const response = await blogService.create({ title, author, url })
      console.log('RESPONSE:', response)
      response === undefined
        ? setNewBlogMsg('Trouble creating a new blog')
        : setNewBlogMsg(`a new blog ${response.data.title} by ${response.data.author}`)

      setTimeout(() => {
        setNewBlogMsg('')
      }, 5000)

    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <form>
      {newBlogMsg.length > 0 ? <BlogMessage message={newBlogMsg}/> : null }
      <div>
        title:
        <input
          type="text"
          name="Title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="URL"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='blog-create-button' onClick={handleCreateNewBlog}>create</button>
    </form>
  )
}

export default CreateNewBlog
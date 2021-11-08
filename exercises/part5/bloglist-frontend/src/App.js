import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // STATE: Login Credentials
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // EVENTS HANDLING: Login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // Get users from database
      const user = await loginService.login({
        username, password
      })

      // Save user info to temporary local storage
      window.localStorage.setItem('user', JSON.stringify(user))

      // Set token
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // AFTER COMPONENT UPDATE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }

    blogService.getAll().then(blogs => {
      blogs.sort((blog1,blog2) => blog2.likes - blog1.likes)
      setBlogs(blogs)
    })
  }, [])

  // Logged out
  if (user === null) {
    return (
      <div>
        <div>log in to application</div>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='login-username'
              value={username}
              name="Username"
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='login-password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  // Logged in
  return(
    <div>
      <h2>blogs</h2>

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

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

export default App
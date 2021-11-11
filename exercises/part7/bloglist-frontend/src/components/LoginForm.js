import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../reducers/loggedUserReducer'
import { setUser } from '../reducers/loggedUserReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.loggedInUser)

  // STATE: Login Credentials
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // EVENTS HANDLING: Login
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }


  if (user !== null) {
    return(
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    )
  }

  return(
    <div>
      <div>log in to application</div>
      <div style={{ color: 'red' }}>{notification}</div>
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

export default LoginForm
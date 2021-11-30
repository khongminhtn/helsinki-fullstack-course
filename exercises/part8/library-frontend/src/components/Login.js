import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const Login = ({ setToken, show, setPage }) => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data]) // eslint-disbale-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>username<input value={username} onChange={({ target }) => setUser(target.value)}/></div>
        <div>password<input type="password" value={password} onChange={({ target }) => setPass(target.value)}/></div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
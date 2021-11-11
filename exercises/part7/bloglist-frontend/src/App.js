import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// COMPONENTS
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'


// ACTIONS
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loggedUserReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)

  // AFTER COMPONENT UPDATE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }

    dispatch(getBlogs())
    dispatch(getUsers())
  }, [])

  if (user === null) {
    return <LoginForm/>
  }

  // Logged in
  return(
    <Router>
      <LoginForm/>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Blogs/>}/>
      </Routes>
    </Router>
  )
}

export default App
import loginService from '../services/login'
import blogService from '../services/blogs'

import { notifyUsers } from './notificationReducer'

const usersReducer = (state={}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'SET_USER':
      return action.payload
    default:
      return state
  }
}

// ACTION CREATORS
export const login = ({ username, password }) => {
  return async dispatch => {
    try {
      // Get users from database
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      // Save user info to temporary local storage
      window.localStorage.setItem('user', JSON.stringify(user))

      // Dipatches action
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    } catch(exception) {
      dispatch(notifyUsers('Wrong Credentials'))
      setTimeout(() => {
        dispatch(notifyUsers(''))
      }, 5000)
    }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export default usersReducer
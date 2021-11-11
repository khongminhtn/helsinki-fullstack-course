import userService from '../services/user'

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload
    default:
      return state
  }
}

// ACTION CREATORS

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('GET USERS', users)
    dispatch({
      type: 'GET_USERS',
      payload: users
    })
  }
}

export default usersReducer
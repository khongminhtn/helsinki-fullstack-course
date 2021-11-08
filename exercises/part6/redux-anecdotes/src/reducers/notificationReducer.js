
const initialState = {
  message: null,
  timeout: null,
}
const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data
    case 'RESET':
      return initialState
    default:
      return state 
  }
}

// Action creators
export const setNotifcation = (message, time) => {
  return async dispatch => {
    const timeout = setTimeout(() => dispatch({type: 'RESET'}), time * 1000)
    dispatch({
      type: 'NOTIFICATION',
      data: { message, timeout }
    })
  }
}

export default notificationReducer
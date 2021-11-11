const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      console.log('NOTIFY REDUCER PERFORMED')
      return action.payload
    default:
      return state
  }
}

// ACTION CREATORS
export const notifyUsers = (message) => {
  return {
    type: 'NOTIFY',
    payload: message
  }
}

export default notificationReducer
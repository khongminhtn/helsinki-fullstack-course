const filterReducer = (state='', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

// Action reducer
export const filterAnecdotes = (content) => {
  return {
    type: 'FILTER',
    data: content
  }
}

export default filterReducer
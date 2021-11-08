import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

// It’s very important that the reducer stays pure. Things you should never do inside a reducer:

// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Calling non-pure functions, e.g. Date.now() or Math.random().
// It is important to keep state object as flat as possible (no nesting) 

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_ANECDOTES':
      return action.anecdotes
    case 'VOTE':
      return state
        .map(anecdote => anecdote.id === action.newAnecdote.id ? action.newAnecdote : anecdote)
        .sort((a, b) => b.votes - a.votes)
    case 'ADD_ANECDOTE':
      return [...state, action.newAnecdote].sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

// Action creators
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(
      {
        type: 'INITIAL_ANECDOTES',
        anecdotes
      }
    )
  }}

export const addVote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      newAnecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      newAnecdote
    })
  }
}

export default anecdoteReducer
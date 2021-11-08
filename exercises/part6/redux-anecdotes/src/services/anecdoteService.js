import axios from 'axios'
import anecdoteReducer from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const anecdote = {content, id: getId(), votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async(anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  const response = await axios.put(url, anecdote)
  return response.data
}

export default { 
  getAll,
  createNew,
  update
}
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

const update = async editedBlog => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const url = `${baseUrl}/${editedBlog.id}`

    const response = await axios.put(url, editedBlog, config)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

const remove = async blog => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const url = `${baseUrl}/${blog.id}`

    const response = await axios.delete(url, config)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

export default { getAll, create, update, remove, setToken }
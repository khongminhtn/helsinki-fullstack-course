import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl) // returns a promise
    return request.then(response => response.data) // promise fulfilled, returns data
}

const create = newObject => {
    // then() is used as a way to chain operations after promise is fulfilled
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    // PUT requires pointing to a very specific address/URL
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteObject = id => {
    // ID is used as an identifier to point to the specific resource
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteObject }
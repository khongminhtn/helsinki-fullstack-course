import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const setBirthYear = (event) => {
    event.preventDefault()

    console.log(name, born)

    editAuthor({
      variables: {
        name,
        setBornTo: born
      },
      refetchQueries: [
        { query: ALL_AUTHORS }
      ],
      onError: (error) => console.log(error)
    })


    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={setBirthYear}>
        <div>
          <select 
            onChange={({ target }) => setName(target.value)}
          >
            {
              result.data.allAuthors.map(a =>
                <option key={a.name} value={a.name}> {a.name} </option>  
              )
            }
          </select>
        </div>
        <div>
          born
          <input 
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

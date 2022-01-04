import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    id
    title
    published
    author {
      name
    }
  }
}
`

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [getResult, result] = useLazyQuery(ALL_BOOKS)

  const handleGenres = ({ target }) => {
    setGenre(target.value)
    getResult({
      variables: { genre }
    })
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data ? result.data.allBooks : props.books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button 
          value="refractoring" 
          onClick={handleGenres}
        >refractoring</button>
        <button 
          value="agile" 
          onClick={handleGenres}
        >agile</button>
        <button 
          value="design" 
          onClick={handleGenres}
        >design</button>
        <button 
          value="patterns" 
          onClick={handleGenres}
        >patterns</button>
        <button 
          value="crime" 
          onClick={handleGenres}
        >crime</button>
        <button 
          value="classic" 
          onClick={handleGenres}
        >classic</button>
        <button 
          value="database" 
          onClick={handleGenres}
        >database</button>
        <button 
          value="" 
          onClick={handleGenres}
        >all genres</button>
      </div>
    </div>
  )
}

export default Books
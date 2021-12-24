import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
      born
    }
  }
}
`

const Books = (props) => {

  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS,
    {
      variables: { genre }
    }
  )

  const handleGenres = ({ target }) => {
    setGenre(target.value)
    result.refetch()
    console.log('testing')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

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
          value="" 
          onClick={handleGenres}
        >all genres</button>
      </div>
    </div>
  )
}

export default Books
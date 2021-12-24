import React, { useEffect } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

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

const ME = gql`
query Me {
  me {
    username
    favouriteGenre
  }
}
`

const Recommend = ({ show, token }) => {
  const meResult = useQuery(ME, {
    context: {
      headers: { authorization: `bearer ${token}` }
    }
  })

  const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    meResult.refetch()
    if (meResult.data){
      if (meResult.data.me) {
        getBooks({
          variables: { genre: meResult.data.me.favouriteGenre }
        })
      }
    }
  }, [token, meResult.data])

 
  if (!show) {
    return null
  }

  const books = bookResult.data.allBooks

  return(
    <div>
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
    </div>
  )
}

export default Recommend
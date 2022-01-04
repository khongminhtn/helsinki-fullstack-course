import React, { useState } from 'react'
import { gql, useSubscription, useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`

const ALL_BOOKS = gql`
query Query {
  allBooks {
    title
    published
    genres
    author {
      name
      born
    }
  }
}
`
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const client = useApolloClient()

  // Query all books
  const result = useQuery(ALL_BOOKS)

  // Update Cache function
  // Requires new book data as params
  const updateCacheWith = (addedBook) => {
    const includedIn = (books, object) => {
      const booksId = books.map(b => b.title)
      booksId.includes(object.title)
    }

    const dataInStore = client.readQuery({
      query: ALL_BOOKS
    })

    console.log(addedBook)
    console.log('data store', dataInStore)
    console.log('client', client)

    if (!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  // Subscribed Data being sent back, accessed with subscriptionData
  // Then run the update cache function
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert('Book has been added')
      console.log('subs data', subscriptionData)
      updateCacheWith(addedBook)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token === '' 
            ? <button onClick={() => setPage('login')}>login</button>
            : <button onClick={() => setPage('add')}>add book</button>
        }
        {
          token !== ''
            ? <button onClick={() => setPage('recommend')}>recommend</button>
            : null
        }
        {
          token !== ''
            ? <button onClick={() => setToken('')}>logout</button>
            : null
        }
          
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        books={result.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        token={token}
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Recommend
        token={token}
        show={page === 'recommend'}
      />

      <Login
        setPage={setPage}
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App
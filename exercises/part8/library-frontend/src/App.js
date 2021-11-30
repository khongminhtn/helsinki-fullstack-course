import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')

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
            ? <button onClick={() => setToken('')}>logout</button>
            : null
        }
          
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
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
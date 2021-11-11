import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  return(
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        <tr>
          {users.map(user => <td key={user.id}>{user.name}</td>)}
          {users.map(user => <td key={user.id}>{user.blogs.length}</td>)}
        </tr>
      </table>
    </div>
  )
}

export default Users
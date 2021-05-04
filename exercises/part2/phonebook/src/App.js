import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')


  const updateNewName = (e) => setNewName(e.target.value)
  const addName = (e) => {
    e.preventDefault()
    // concat metho merges 2 arrays and generate a new compeleted array
    // then replace persons with the newly merged array
    const newNameObject = [{ name: newName }]
    setPersons(persons.concat(newNameObject)) 
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={updateNewName}/>
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => <li key={person.name}>{person.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App;

import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: ''
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')


  const updateNewName = (e) => setNewName(e.target.value)
  const updateNewNum = (e) => setNewNum(e.target.value)
  const addPerson = (e) => {
    e.preventDefault()
    // concat method merges 2 arrays and generate a new compeleted array
    // then replace persons with the newly merged array
    const newNameObject = [{ 
      name: newName,
      number: newNum 
    }]
    persons.find(person => person.name === newName) === undefined
    ? setPersons(persons.concat(newNameObject))
    : window.alert(`${newName} is already added to phonebook`)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input onChange={updateNewName}/></div>
        <div>number: <input onChange={updateNewNum}/></div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        }
      </ul>
    </div>
  )
}

export default App;

import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState('')

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
  const filterNames = (e) => setFilteredNames(e.target.value.toLowerCase())
  const namesToDisplay = persons.filter(person => person.name.toLowerCase().includes(filteredNames))

  return(
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={filterNames}/></div>
      <h2>add a new</h2>
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
          filteredNames === '' 
          ? persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
          : namesToDisplay.map(person => <li key={person.name}>{person.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App;

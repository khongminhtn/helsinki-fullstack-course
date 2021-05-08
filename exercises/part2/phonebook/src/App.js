import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
    <div>
      <div>filter shown with <input onChange={props.filterNames}/></div>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form>
      <div>name: <input onChange={props.updateNewName}/></div>
      <div>number: <input onChange={props.updateNewNum}/></div>
      <div>
        <button onClick={props.addPerson} type="submit">add</button>
      </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      { 
        props.filteredNames === '' 
        ? props.persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        : props.namesToDisplay.map(person => <li key={person.name}>{person.name}</li>)
      }
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState('')

  // useEffect takes 2 parameters
  //    one for Promise HTTP request
  //    the other to define how often it is run
  useEffect(() => {
    console.log('Fetching data...')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
      <Filter filterNames={filterNames}/>
      <h2>add a new</h2>
      <PersonForm
        updateNewName={updateNewName}
        updateNewNum={updateNewNum}
        addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        namesToDisplay={namesToDisplay}
        filteredNames={filteredNames}/>
    </div>
  )
}

export default App;

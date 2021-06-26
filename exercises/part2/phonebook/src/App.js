import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const ErrorMessage = ({message}) => {
  const errorStyle = {
    color: message.includes('Added') ? 'green' : 'red',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
  }
  return(
    <div style={message.length > 0 ? errorStyle : null}>
      {message}
    </div>
  )
}

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
        ? props.persons.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id, person.name)}>delete</button></li>)
        : props.namesToDisplay.map(person => <li key={person.name}>{person.name}<button onClick={() => props.deletePerson(person.id, person.name)}>delete</button></li>)
      }
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  // useEffect takes 2 parameters
  //    one for Promise HTTP request
  //    the other to define how often it is run
  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const updateNewName = (e) => setNewName(e.target.value)
  const updateNewNum = (e) => setNewNum(e.target.value)
  const filterNames = (e) => setFilteredNames(e.target.value.toLowerCase())
  const namesToDisplay = persons.filter(person => person.name.toLowerCase().includes(filteredNames))

  // Request to add a person to database
  const addPerson = (e) => {
    e.preventDefault()
    // concat method merges 2 arrays and generate a new compeleted array
    // then replace persons with the newly merged array
    const newPerson = { 
      name: newName,
      number: newNum,
    }
    const existingPerson = persons.find(person => person.name === newName)
    existingPerson === undefined
    ? personService
        .create(newPerson)
        .then(data => {
          setErrorMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          setPersons(persons.concat(data))
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
    : personService
        .update(existingPerson.id, newPerson)
        .then(data => {
          window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one ?`)
          setErrorMessage(`Number is replaced for ${existingPerson.name}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : data))
        }).catch(() => {
          setErrorMessage(`Information of ${newPerson.name} has already been removed`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
  }
  // Request to delete a person in database
  const deletePerson = (id, name) => {
    personService
      .deleteObject(id)
      .then(() => {
        window.confirm(`Delete ${name}`)
        setErrorMessage(`Deleted ${name}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      }).catch(() => {
        setErrorMessage(`Information of ${name} has already been removed`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage}/>
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
        filteredNames={filteredNames}
        deletePerson={deletePerson}/>
    </div>
  )
}

export default App;

const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '938-209-3820938'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  },
]

// We create event handlers to repond to GET, POST, DELETE, PUT, PATCH requests 
// We then return a response to the client
app.get('/api/persons', (req, res) => {
  return res.status(200).json(persons)
})

app.get('/info', (req, res) => {
  const display = `<div>Phonebook has info for ${persons.length} people</div><br/><div>${Date()}</div>`
  return res.status(200).send(display)
})

// :id is a param and can be accessed in the request object
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id 
  const person = persons.find(person => person.id === Number(id))
  if (person) {
    return res.status(200).json(person)
  } else {
    return res.status(400).send('Person does not exist')
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id) 
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  console.log(newPerson)
  if (!newPerson.name) {
    return res.status(400).send('Missing name')
  } else if (!newPerson.number) {
    return res.status(400).send('Missing number')
  } else if (persons.find(person => person.name === newPerson.name)) {
    return res.status(400).send('Person already exist')
  } else { 
    newPerson.id = Math.floor(Math.random() * 1000)
    persons = persons.concat(newPerson)
    console.log(persons)
    res.status(200).json(newPerson)
  }

})
// Once event handlers are defined, we create a listener that listens for the Client requests
// that are being sent to the port we defined.
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


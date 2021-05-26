const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const static = require('static')

const app = express()
// Middlewars
// Express's built in json object converting
app.use(express.json())
// Morgan loggin tool
app.use(morgan((tokens, req, res) => {
  const content = JSON.stringify(req.body)
  return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens['response-time'](req, res)} ms ${content}`
})) 
// Allows the backend cross-origin resource sharing
app.use(cors())
// Display static files (react build files)
app.use(express.static('build'))

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
  const display = `Phonebook has info for ${persons.length} people</div><br/><div>${Date()}`
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
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (!newPerson.name) {
    return res.status(400).send('Missing name')
  } else if (!newPerson.number) {
    return res.status(400).send('Missing number')
  } else if (persons.find(person => person.name === newPerson.name)) {
    return res.status(400).send('Person already exist')
  } else { 
    newPerson.id = Math.floor(Math.random() * 1000)
    persons = persons.concat(newPerson)
    res.status(200).json(newPerson)
  }
})

// Once event handlers are defined, we create a listener that listens for the Client requests
// that are being sent to the port we defined.
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


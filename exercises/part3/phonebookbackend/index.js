require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const static = require('static')
const Person = require('./models/person')
const mongoose = require('mongoose')


// ==== Middlewares ====
const app = express()
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



// ==== Route Handler ====
// We create event handlers to repond to GET, POST, DELETE, PUT, PATCH requests 
// We then return a response to the client
app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(result => res.status(200).json(result))
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(result => {
      const display = `Phonebook has info for ${result.length} people</div><br/><div>${Date()}`
      return res.status(200).send(display)
    })

})

// :id is a param and can be accessed in the request object
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id 
  Person
    .findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error)) // middleware next() passes errors to Express
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

  const newPerson = req.body
  new Person({name: newPerson.name, number: newPerson.number})
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res) => {
  // by default updatedPerson is the original document
  // {new:true} causes event handler to be called with the modified doc
  console.log(req.body)
  Person
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
})

// ==== Error Handler Middleware ====
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

// Once event handlers are defined, we create a listener that listens for the Client requests
// that are being sent to the port we defined.
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


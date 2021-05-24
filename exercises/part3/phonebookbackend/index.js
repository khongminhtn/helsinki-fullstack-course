const { response } = require('express')
const express = require('express')
const app = express()

persons = [
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

app.get('/api/persons', (req, res) => {
  console.log(req)
  console.log(res)
  return res.status(200).json(persons)
})
require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// ========= MONGOOSE DEFINITION ===========
const url = process.env.MONGO_URI
console.log('connecting to ', url)

// connecting to mongo database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Creating the schema structure of the document
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  number: {
    type: Number,
    required: true,
    minLength: 8
  },
})

personSchema.plugin(uniqueValidator)

// replacing _id object to id
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PhoneBook', personSchema)

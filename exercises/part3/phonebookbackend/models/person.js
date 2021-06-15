require('dotenv').config()
const mongoose = require('mongoose')

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
  name: String,
  number: Number,
})

// replacing _id object to id
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PhoneBook', personSchema)

const mongoose = require('mongoose')

// Structure of database and validation
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

// Create a model object to allow data manipulation and queries
module.exports = mongoose.model('Author', schema)
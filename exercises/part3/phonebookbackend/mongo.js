// importing mongoose
const mongoose = require("mongoose")

// check if commandline param are correct
if (process.argv.length < 3) {
  console.log('Please provide the password, name and phone number in the correct order')
  // Node's processing object
  // process.argv[1] is path to Node and [2] is path to the file being executed
  // Any additional arguments [2 + N] will be argument given from commandline
  process.exit(1)
}

const password = process.argv[2]
const entryName = process.argv[3]
const entryPhone = process.argv[4]

const url = `mongodb+srv://tuyen:${password}@cluster0.ltxkx.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// *new* creates an instance of a class, instantiate a class. 
const phoneBookSchema = new mongoose.Schema({
  name: String,
  phone: Number
})

// creates a model with phoneBookSchema schema
// Model has operations for working with database
// This could also be seen as collection
const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

if (process.argv.length === 3) {
  PhoneBook
    .find({})
    .then(result => {
      result.forEach(entry => console.log(entry))
      mongoose.connection.close()
    })
} else {
  // adds an entry document to the collection PhoneBook
  const entry = new PhoneBook({
    name:  entryName,
    phone: entryPhone
  })

  // saves document and then end connection
  entry
    .save()
    .then(result => {
      console.log(`added ${entryName} ${entryPhone} to phonebook`)
      mongoose.connection.close()
    })
}
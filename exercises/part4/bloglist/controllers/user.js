const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('', async(request, response) => {
  const users = await User.find({}).populate('blogs')
  response.status(200).json(users)
})

userRouter.post('', async (request, response, next) => {
  try {
    if (!(request.body.username || request.body.password)) {
      return response.status(400).json({
        error: 'invalid username or password'
      })
    } else if (request.body.password.length <= 3) {
      return response.status(400).json({
        error: 'Password need to have 3 or more characters'
      })
    }

    // Hashing password
    const passwordHash = await bcrypt.hash(request.body.password, 10) // saltRounds = 10

    // Creating a new document
    const user = new User({
      username: request.body.username,
      name: request.body.name,
      passwordHash
    })
  
    // Save document
    const savedUser = await user.save()
    // Respond to front end
    response.status(201).json(savedUser)

  } catch(exception) {
    response.status(400).json({error: exception.message})
  }
})

module.exports = userRouter
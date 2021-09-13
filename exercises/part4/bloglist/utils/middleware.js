const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  console.log('ERROR:', error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('---REQUEST---')
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  next()
}

const responseLogger = (request, response, next) => {
  console.log('---RESPONSE---')
  console.log('Body:', response.body)
  console.log('Status:', response.status)
  next()
}

const tokenExtractor = (request, response, next) => {
  // Coupled: userExtractor
  const authorization = request.get('authorization')
  console.log(authorization) //////////////
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  // Coupled: tokeExtractor
  console.log(request.token) //////////////////
  console.log(process.env.SECRET) ///////////////////
  request.user = request.token === undefined
  ? null
  : jwt.verify(request.token, process.env.SECRET)
  
  next()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  responseLogger,
  errorHandler
}
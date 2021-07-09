# Structure of backend application
1. index.js ()
2. app.js (middlewares)
3. build (directory)
4. controllers (directory)
5. models (directory)
6. package-lock.json
7. package.json
8. utils
  - config.js
  - logger.js
  - middleware.js (deals with custom middlewares and error handlers)

- require('express').Router()
  - A middleware
  - use to set up all route handlers in a seperate module

- Testing Node Applications
  - Jest resembles the previous king of JavaScript testing Mocha
  - Jest works well with testing backend and shines working with react
  - jest wont work with directory with spaces in its name
  - tests are only executed during development
  - Report in verbose style
  - "jest": {"testEnvironment}:"node"
  - **a file test_helper under utils dir to define functions to run test with**
  - **another file test under tests dir takes in test_helper functions to be tested**
 
# Testing Backend
- **Unit testing** are for complicated backend logic
- Some situations, it is beneficial to to implement test with **Mock database**
- When multiple components are being tested, it is called **Integration testing**

- Testing Environment
  - Conventionally, execution mode should be defined for Node app with NODE_ENV
  - It is a common practice to define seperate mode for development and testing
    - Scripts: "NODE_ENV=production node index.js"
    - Scripts: "NODE_ENV=development nodemon index.js
    - Scripts: "NODE_ENV=test jest --verbose --runInBand"
      - --runInBand prevents jest from doing parrallel tests
      - Important when testing with database
    - cross-env package is required for windows users.
    - ie Scripts: "cross-env NODE_ENV=production node index.js"
  - It is good practice to do tests with database in local machine.
  - It is better to execute only the test you are working on.

- supertest
  - supertest is a package that helps to write api tests
  - async/await refering to API requests is an asynchronous operation
    - It is a simpler syntax compared to promises
  - supertest wraps the express application app.js into a so called superagent

- Initializing database
  - Jest offers many other functions that can be used for executing operations before test is run.
  
- async/await
  - a much simpler syntax and easier to read
  - const notes = await Note.find({})
    - await will pause at the execution, until promise is full filled
    - response is then passed on to the constants notes
  - better syntax than .then().then() chaining
  - **In order to use async/await syntax, they have to return a promise**
    - whereas regular asynchronous functions can be wrap callbacks on promise
  - **await keyword can only be used inside of an async function**
  - **Although it is such a simple syntax, it is still important to understand how promises works**
  - use either async/await or then(), but never mix the two.

- Error handling and async/await
  - use try { } catch { } mechanism
    - first it tries to perform the code, if promise not fulfilled
    - it catches the request handling and passes it to the error handling middleware

- Eliminating try and catch
  - introduce the library "express-async-errors" like so 
  - require("express-async-errors")
  - you will no longer need to add try and catch as this will do it for you under the hood
    - the library will pass the exception to the errors middleware

- Optimizing the beforeEach function  
  - async operations will only wait for await defined inside of it
  - to wait for all await operations, Promise.all(arrayOfPromises) needs to be called, it will wait for all of the promises inside the list to be fulfilled before itself is fulfilled

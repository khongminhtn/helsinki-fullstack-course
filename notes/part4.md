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
9. tests
 
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
    - It is used to create common functions to execute in other tests
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
  - Test execution in particular typically requires that a single database instance is not used by tests that are running concurrently.
  - The optimal solution would be to have every test execution use its own separate database
    - This can be done by using Mongo's in-memory feature
    - Or by using Docker containers
 
- supertest
  - supertest is a package that helps to write api tests
  - async/await refering to API requests is an asynchronous operation
    - It is a simpler syntax compared to promises
  - supertest wraps the express application app.js into a so called superagent
  - Imports express app "app.js" and wrap it with supertest() into a "superagent", which can be used to make HTTP requests to backend
  - Default timeout time is 5000
  - Express application was extracted to app.js, that leaves the role of the index.js file to launch the application at specified port with Node's built-in http object.
 
- Initializing database
  - Jest offers many other functions that can be used for executing operations before test is run.
  - For robust tests, database needs to be reset and then generate a test data needed
    - That means deleting all data in the database and then give the database new data to test.
    - This insures that the database is at the same state for every test run
  - Use beforeEach() to intialize the data base
  - The beforeEach() will run before each test
 
- Running Tests 1 by 1
  - Specify tests that need to be ran as a parameter of the npm test command
  - Example:
    1. npm test -- tests/note_api.js
      - Runs all tests in this specific file
    2. npm test -- -t "a specific note is within the returned notes"
      - Runs the named test
    3. npm test -- -t "notes"
      - Runs all test that contain "notes" in its name
  
- async/await
  - a much simpler syntax and easier to read
  - const notes = await Note.find({})
    - await will pause at the execution, until promise is full filled
    - once fulfilled, response is then passed on to the constants notes
  - better syntax than .then().then() chaining (promise chaining)
  - **In order to use async/await syntax, they have to return a promise**
    - whereas regular asynchronous functions can wrap callbacks on promise
  - **await keyword can only be used inside of an async function**
  - **Although it is such a simple syntax, it is still important to understand how promises works**
  - use either async/await or then(), but never mix the two.
 
- backend async/await refactoring
  - when refactoring there is always risk of regression (existing functionality may break)
 
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
 
# User Administration
- One-to-many relationship between user and notes
- User1 -> *Notes
- Working with relational database, implementation would be straight forward
- Document databases has different ways of modeling situation
  - Saves users in one collection and then save notes in another
- Traditionally, document databases like Mongo do not support join queries
- Instead multiple queries is made
- Mongoose can take care of joining and aggregating data
  - However, in the background, it still makes multiple queries
 
- References accross collections
  - **types: mongoose.Schema.Types.ObjectId** AND **ref: models**
    - defines the type to be an object id and the id refers to a model in the database
  - 1 document can have a reference to another document
  - Document databases use references to link databases together
  - A document can also hold a list of references to other documents
  - Or it can have nested documents within 
  - Schema-less databases require developers to make radical designs about data organization
  - On average, relational databases offer a more or less suitable way of organizing data
  - Both collections will have references to eachother. Which imitates the relationship structure that relational databases has 
    - One-to-many
    - One-to-one
    - Many-to-many
  
- Creating users
  - Password hash is the output of [one way hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
  - It is neverwise to store unencrypted plan text passwords in database
  - Use bcrypt to generate password hashes
  - [Fundamentals of storing passwords](https://codahale.com/how-to-safely-store-a-password/)
  - Manually testing usernames and passwords can be cumbersome due to enforcing it to be unique
    - Automated testing is desired in this situation
  - [Test driven development](https://en.wikipedia.org/wiki/Test-driven_development) where tests for new functionality are written before functionality if implemented
 
- Populate
  - Mongoose join operation is not the same a join queries in relational database
    - It will still be doing multiple queries 
    - Relational database's join queries is transactional meaning that the database does not change during query
    - Whereas mongoose queries operations, database can still change during queries.
  - To populate using mongoose, perform a find({}) method that contains nested documents and then chain populate('field') method to populate.
    - User.find({}).populate('notes')
    - We can also use populate() to only retrieve field specifics
      - populate('notes', {content: 1, date: 1} )
  - populate functionality works based on the defined **types** and **ref** in the Mongoose schema.
  - Populate functionality will use the id in the nested document and populate it with the actuall object
 
# Token authentication  
![token authentication diagram](https://fullstackopen.com/static/8b2839fe97680c325df6647121af66c3/5a190/16e.png)
- Diagram to text:
  1. Users logs in using form from React
  2. React sends login info to server address as GET HTTP Request
  3. If info correct, server generates token to indentify user
    - Token is signed digitally and it is impossible to falsify (cryptography)
  4. Backend responds with successful status code and the token
  5. Browser saves the token to a react state
  6. When users performs operations that requires indentification, server sends a HTTP request with Token in header
  7. Server uses the token to identify the user
- We use jsonwebtoken library to generate [JSON web tokens](https://jwt.io/)
- Processing login in back end procedure:
  1. Search for username using requested username
  2. If found, compares requested password hases with password hases in database using bcrypt.compate(requested, database)
  3. If correct, then create an object of username and user id to generate a token using jwt.sign(userObject, env)
  4. Then save to environment variable, must be set in .env file
  5. Sends status code 200 after success
  6. Else sends appropriate status codes 401 (unauthorized).
 
- Limiting creating new notes to logged in users
  - There are several ways of sending token to server
  - We use [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
    - It contains authentication information
    - Including tokens and [authentication schemes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes)
    - Identifying the scheme tells the server how the attached credentials should be interpreted
  - The *Bearer* scheme is suitable
    -  Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW
  - use jwt.verify(requestedToken, browserToken) to compare tokens
  
- Error handling
  - Token verification can also cause a JsonWebTokenError 
  - Reasons for decoding error
    - Token can be faulty
    - falsified
    - expired
  - If application requiring multiple interfaces requiring identification, JWT's validation should be seperated into its own middleware
 
- Problems of Token-based authentication
  - Once React app gets a token, the API has a blind trust to the token holder
    - What if the token holder has ill intentions ?
    - Solutions
      1. Limit the validity period of a token
        - using jwt.sign(userObject, env, **settings**)
        - settings: {expiresIn: 60*60}
        - error handling middleware should be extended properly to deal with error
        - The shorter the time, the safer the solution, but it is painful for true users
      2. server side session
        - save each token to backend database and check each api request if access right corresponds to the token
        - Negative aspect of server side session is increased complexity in the backend and affect on performance
        - Typically token is saved to a key-value-database such as Redis (limited functionaltiy), but extremely fast in some usage scenarios
        - Token are just a random string
        - each API request, the server collects relevant information about the user
        - These strings are stored in cookies rather than in Authorization-header

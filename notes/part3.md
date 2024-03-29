# Introduction
- Focuses on Backend
- Implements simple REST API in Node.js by using Express library
- Data will be stored in MongoDB database
- Deploys application to the internet

# Node.js
- Building backend on top of Node.js
    - JavaScript runtime based on Google's Chrome V8 JS Engine
    - Check node version using:  node -v in command line.
- Newest features of JS is not yet supported by browsers
    - The code requires transpiling using babel
- However, Node.js supports the majority of JS newst features
    - Does not require transpiling.
- npm originated from the node ecosystem
- **When working with backend code, always keep an eye on the terminal**
 
### Simple Web Server
- Different local servers require different ports to run on
- import http from 'http'  <== ES6 imports requires exports
    - imports Node's built in web server module
    - Node's uses CommonJS instead as it does not support ES6 yet.
    - CommonJS function almost exactly like ES6
    - http.createServer() 
        - create a new web server
        - an event handler is registered to the server
        - event handler is called everytime a request is made to the server address
- Primary focus for our backend is to provide data in JSON format to front end
- Much like json-server

### Express
- Implementing server code with just Node's built in web server is cumbersome when application grows in size
- Express offer a more pleasing interface to work with backend
- Express is a dependency that also has other dependencies, which are called transitive dependencies
- Express is a function that is used to create express application
- express().get()
    - One of express's event handler
    - Event handler function takes 2 params
        1. request param, contains info of HTTP request 
        2. response param, defines how request is responded
            - response.send() automatically sets the Content-Type header to be HTML
            - response.json(data) automatically sets the Content-Type header to be JSON
                - With Node alone, you have to stringify a JSON object, however with express, this happens automatically
- Highly recommended to use node-repl to test how commands works

### nodemon
- Changes made to the backend application, requires a restart to see changes
- nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

### REST
- REPRESENSTATIONAL STATE TRANSFER
- Allows building scalable applications
- RESTful thinking
    - Resources
        - contains URL pointing to that resource collection
            - each resource has a unique id
- REST API Designers:
    - REST API should not depend on any communcation protocol
    - REST API should not change communication protocol
    - Effort should be defining media type representing resource
    - Must not define fixed names or hierarchies
    - Should never have client important "typed" resources
    - Should be entered with no prior knowledge beyond initial URI

### Postman
- Used for API testing
- Or instead we can use VS Code REST Client to test api
    - Install plugin then create a .rest file and place HTTP request inside -> click on send requests and results will be displayed
    - Multiple requests can be done with ### seperator

### Receiving data
- making a HTTP POST request to the address
    - Send all the information in the request body in JSON format
    - Easier access to data by activate express's json-parser
        - express().use(express.json())   => activates json-parser
        - Transform into a JS object
        - Server will not parse the data correctly if Content-Type is defined incorrectly
    - remember to return a response to end the function
    - generate time stamp on server rather than browser, browser might not set its clock correctly

### About HTTP request types
- HTTP Standard talks about 2 properties **safety** and **idempotence**:
    - Safe
        - **GET** and **HEAD** methods **SHOULD NOT** have the significance of taking action other than retrieval. Considered "safe".
        - Safety means no side effects caused to the server
        - Side effects means that no changes to database upon requests
        - Return must only return data that already exists in the server
        - HEAD returns nothing but status code and response headers
    - Indempotence:
        - All HTTP request except POST should be indempotent.
        - This means that any side effects should result the same
            - GET, HEAD, PUT, DELETE
    - POST is the only type that is neither safe nor idempotent

### Middleware
- json-parser is so called middleware
- functions that is used for handling request and response objects
- Several middleware can be used at the same time
    - executed 1 by 1 in order
    - in Express it is executed with app.use(middleware())
- middleware can be chained in .user(middleware1, ..., middlewareN)
- or middleware can also be registered for specific route calls

# Deploying App to internet
### CORS
- Cross-origin resource sharing
- Mechanism allowing 2 domains to share resources
    - Images
    - Style sheets
    - Fonts
    - Scripts
    - iFrames
    - Videos
- Certain cross-domain requests, mostly Ajax request are forbidden
    - by default because of the same origin security policy
    - use Node's **cors** middleware to allow requests from other domains
- Current app setup
    - React index.js => PORT: 3000 => Browser
    - Node index.js => PORT: 3001 => Browser
    - 2 seperate servers, 1 serve frontend and 1 serve backend
### Application to the internet
- Heroku (backend server)
    - add Procfile to tell heroku how to start
        - web: npm start
    - change port to use environment variable if undefined then use 3001
    - create a git respository and push it to heroku
- Front end production
    - By default react is created and run in dev mode
        - displays errors
    - for production, react app need to be optimized
        - if app created with create-react-app
            - *npm run build* can be used to optimize
                - this will create a minified version of the application
                - **a single *index.html* file with all javascript code from all of app's dependencies minified into this single file**
- Serving static files from the backend
    - copy the build directory to root of backend and configure the back end to show frontend's main page
    - to make express show static content we need middlewares called *static*
    - when HTTP Get request happen, static first checks build directory for file corresponding with request's address
    - Negative aspect of this way of deploying front end is:
        - Complicated
        - Make deployment pipeline more difficult
            - Deployment pipeline:  
                - Moves the code of the developer through tests and quality checks for production
    - There are many ways of deploying the front end.
- Streamlining deploying of the frontend
    - commandline scripting to avoid manual npm typing
    - windows runs cmd.exe as shell and not bash
- Proxy
    - changing default proxy can easily be done in package.json
        - "proxy": "http://localhost:**PORT**"
    - only has effect during development (npm start)
    - If base url is not availble proxy is used to set a default baseurl for requests
- A typical problem with deploying app to the internet is missing dependency in package.json and ports not configured with environment variable


# Saving Data to MongoDB
### Debugging Node Applications
- Debugging Node Application is more difficult than JavaScript
- Printing to console is tried and true method
- Visual Studio Debugger or Chrome Dev Tool
- Question everything
    - Eliminate all possibilities 1 by 1
    - Console Loggings, Postman and debuggers will help
    - Do not continue to write code when there are bugs
### MongoDB
- Store data indefinitely
- instead of relational database, MongoDB is document database
- Document database is categorized under NoSQL
- Databases and Collections
    - Mongo stores data records as BSON document
        - records gathered together as collections
    - Mongo holds one or more collection of docs
- Collection
    - BSON is a binary respresentation of JSON docs
    - { field: value, field1: value2, ... fieldN: valueN }
    - value can be of any data types
    - field names are string with restrictions
        - _id is reserved as primary key (immutable)
        - cannot contain null character
        - Top-level field names cannot have $
    - Mongo uses dot notation to access elements of an array & field's value using field's name
    - Maximum size of a BSON document is 16 megabytes
        - stops excessive use of RAM or bandwidth
        - to exceed size use GridFS API
    - _id always the first field in the document
        - primary key
        - Can contain BSON data type other than array
    - Renaming fields may result reordering of fields
- Mongoose
    - Higher level API
    - Simpler than official MongoDB Node.js driver library
    - Described as ODM object document mapper
    - Saving Javascript as Mongo Document is easier
    - Schemas defines the structure of the document
        - Given fields and types of data of that field
        - Tells mongoose how to store data
        - Mongoose refers to the collections as plural
        - Whereas schema refers to the name of the model singularly
- Document data base is schemaless
    - Does not care about the structure
- Creating and saving Objects
    - Models
        - Fancy constructors compliled from schema
        - Responsible for creating and reading documents
        - Schema defines the structure such as field and values
        - Models takes the schema and compiles it with a given name
        - When creating and saving documents, end the mongoose connection otherwise execution will never be finished
        - In mongoose, model is a class object that has operation on the document/attributes/data
        - Model is instantiated each time we want to add new data to the database.
- Backend connected to a database
    - When retreiving data from database to frontend, it assumes that every object has an _id field and  __v field and this can be problematic during testing phase.
        - Solve this by modifying toJSON method of the schema so that _id is now id and __v is now v
- Database configuration to its own module
    - defining Node modules is different compared to ES6 
    - public interface of module is defined by setting a value to module.exports variable
    - variables inside the module are private and wont be visible to users of the module.
    - use dotenv to create env variables
        - created in .env file and 
        - Should be gitignored right away
        - require('dotenv').config() will give access to env
        - make sure that dotenv is imported at the top so all modules can have access to the variable
- Verifying frontend and backend integration
    - Test backend first using Postman or VS Code REST Client before testing with frontend
    - It is also good idea to implement one functionality at a time, then test it making sure that it works, then move on to the next functionality
### Error handling
- Mongo has its own id format
- If requested id is not in the correct Mongo format, a CastError will be shown
- 500 is server error
- 404 is not found
- 400 is bad syntax request
- **Always keep an on the console of the backend**
- Moving error handling in to middleware
    - It is better to implement all error handling in a single place
    - It is useful as you can reprort data related to error tracking system like Sentry
    - To process error, use middleware next() so Express can process the error
    - defined errorHandlers middleware has to be the last loaded middleware
- The order of middleware loading
    - The execution order is the same as how they are loaded into express using app.use() 
    - The json-parser middleware should be among the very first to be loaded
- Other Operations
    - delete using mongoose -> findByIdAndRemove method
    - update using mongoose -> findByIdAndUpdate method
- Understand that promise if fulfilled, will be handled with .then() and if rejected, it will be handled with .catch() 
    
# Validation and ESLint
### Mongoose has built in validation
- Built in validation is set in the schema (structure)
- If input is invalid, an exception will be thrown with error.name and error.message
- The exception is then passed to error handlers middleware
- 
### Promise chaining
- many route handlers change the response data to the right format by calling toJSON method from response.json
- Understand that API requests and response works as promises. How we work with promises is using its method **then**. The callbacks then is what we use to handle the fullfilled value or rejections
- By chaining the **then** callbacks this would be called Promise chaining
-  A much easier using *async/await* syntax, it will make writing subsequent asychronous operations a lot easier.
### Deploying the database backend to production
- add mongo uri env to heroku and push the backend app to heroku
- commandline: heroku config:set MONGODB_URI=variable/'variable'
### Eslinting in other word "linting" is a tool that detects and flags errors in programming languages, including stylistic errors
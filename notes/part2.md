# Rendering a collection, modules
> Whats the difference between an experienced Javascript programmer and a rookie ? The experienced one uses console.log 10-100 times more.
- logs more for debugging and do not concatenate
- Javascript Arrays
    - array methods such as *find*, *filter*, *concat* and *map* will be used all the time
        - functional programming
- Rendering collections
    - Rendering an array using list.map() function
- Key Attribute
    - Each render from a list, must contain a unique Key Id
    - React uses key attribute to determine how to update the view generated by a component 
- map()
    - always creates a new array
    - value of variable must be rendered inside a curly braces
- filter()
    - Takes a function and returns a new array of filtered items
- concat()
    - Merges 2 arrays/objects and returns a new array/object.
- Anti-pattern: Array indexes as Keys
    - The second parameter in Map will be Id
    - However, it is not recommended
- Refractoring Modules
    - './components/Note'
        the period refers to current directory
# Forms
### "event" parameter
- is the event that triggers the call to the event handler function
- event.target -> property of the event
- event.target.value -> refers to the value of that element.
 
### Accessing data in input
- Controlled Components
    - uses states
    - added event handlers
        - onClicks
        - onChange
        - and more 
- setVariable(!variable) -> reverses the variable
- variable -> in comparison statement, this is compared to true
    - Simpler than variable === true.
     
# Getting Data From Server
### Tool meant to be used during software development JSON Server.
    - Global installation: 'npm install -g json-server'
    - Local installation: 'npx json-server --port 3001 --watch db.json'
    - json-server default port 3000 clashes with create-react-app default port 3000
        - so we change json-server port to 3001
    - JSONView can be used to display json data in browser 
    - Using json-server during development enables you to use server-side functionality without programming it
    - typically you use a database to store data.
     
### Browser as runtime environment
- classic technique is XMLHttpRequest
    - HTTP request using XHR
    - No longer recommended
    - Java executes sychronously
    - JavaScript engines/runtime environment follow the Asynchronous model
        - IO operations continues without waiting for a return using non-blocking model
        - Input/Output
- JavaScript engines are single threaded
    - requires non-blocking model for executing IO operations
        - Browser would freeze otherwise, to fetch data
        - to be able to continuously react to user's interactions
            - no single computation can take too long
            - no event loops, due to single-threaded engines
    - Today's browser can run code parallely with help of web-worker
    - Event Loops (Asychronous programming.)
        - Asychronous callbacks/Web Api functions takes another function as params
        - These callback functions are passed to the Web API
        - Web Api then passes callback to the Callback Queue
        - Callback queue then wait for the Call stack to finish executing the JavaScript codes.
        - Then all the callback functions in the Queue will start execution. 
### npm 
- fething data from server
    - use promise based fetch to pull data from server
    - using axios allows familiarity with adding npm packages
    - use axios library to communicate between browser and server
- 05/05/2021 nowadays all JS projects are defined using **npm**
    - clear indicator that project uses npm is *package.json*
        - dependencies are what the project requires
        - **should always use npm commands where package.json is located**
- There are runtime dependencies and development dependencies
         
### Axios and promises
- react app and json-server run on 2 different ports, which requires 2 terminals
- to make index.js notice changes instantly, add .env file and put FAST_REFRESH=false in the file.
- "A Promise is an object representing the eventual completion or failure of an asynchronous operation"
    - A promise can be in 3 states:
        - *pending*
        - *fulfilled*
        - *rejected*
- To access results of fulfilled promise object 
    - Use *promise.then*
        - contains all information about the request
            - header, data, config, request, status ...
    - we can chain promise methods such as axios.get().then()
        - we can also give each method its own line for readability
    - data returned is a long string
        - axios can parse the data into an array:
            - header: application/json; charset=utf8
- fetching in App component is less problematic than in index.js
    - however we have to use **Effect-Hooks** to use **axios.get**
     
### Effect-hooks
- Effect Hooks: "The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
- Effect Hooks runs after the component is rendered
- REMEMBER a call to a state-updating function triggers re-rendering of the component
- By default effect is always run after a render.
    - the second parameter of useEffect() defines how often it runs; after every render or once
- When adding data to React, it does not add to the server, we need to update it to the server
- Effect hooks that does not require a clean up are usually hooks that run once and can be forgotten
 
### Development runtime environment
- index.js => react dev-server => React App (Browser)
- database => json => React App (Browser)
- dev-server collects and stitches all javascript files from index.js into 1 file which can be understood by the browser (Web Pack)
- database-server collects data from database and parse it to browser as JSON formatted file 
- So far this is all done in development-environment/ localhost
  
# Altering data in server
### REST (Representational state transfer)
- Refers to individual objects as resources
- Every resources has a unique address, its URL
- **HTTP GET => Retrieves resources**
- **HTTP POST => Creates resources**
- **HTTP PUT => Replaces sources**
- **HTTP PATCH => Changes resource property**
- **HTTP DELETE => Deletes resources**
- json-server requires all resources to be sent in JSON format
 
### Sending Data to the server
- API is used to send data in json format to database/backend
    - Post request or Get request is processed by back end
    - Data being carried or requested by HTTP request
        - is queried using SQL programming
- It is useful to inspect HTTP requests in Network tab of Chrome developer tool
    - Used to check if data being sent or requested is correct
     
### Changin the importance of notes
- By adding unique id key to a react component, that component becomes unique for easier selection and modification that specific component. 
- shallow copy, values of old is same as new object
- Changes to data should update backend database first then use response.data to change the data.
 
### Extracting communication with the backend into a seperate module
- **Promises are central to modern JavaScript development and it is highly recommended to invest a reasonable amount of time into understanding them.**
 
### Cleaner Syntax for defining object literals
- if key and value of an object are the same, it can be written in singles
    - { key: key, name: name, id: id}
    - can be written as { key, name, id }

### Promises and Errors
- promise.then is called only when promise is fulfilled
- promise.catch is used to catch errors when promise is rejected.
 
# Adding styles to React App
### CSS rules comprise of a selector and declaration
- Selector can be the tags or id or class
- In react class is written as className
 
### Inline Styles
- CSS can be defined directly in JavaScript
- CSS syntax is different in JavaScript than in CSS
- It is defined as an object, with keys and values
- numeric pixel values can be defined as integers
- CSS hyphenated properties are written in camelCase
- CSS values defined in words is written as strings
- **Inline style comes with limitations such as pseudo-clases and many others**
- Philosophy of React goes completely against the traditional web developement where CSS, HTML and JS are written in seperate files
- **However, this is not scalable so React entity (components) defines the structure of the website and each entity/component comprise of content (HTML), functionality (JS) and style (CSS) all in one single entity.** 

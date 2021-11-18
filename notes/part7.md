# React-rtouer
### Application navigation structure
- In old school web app, changing page requires a HTTP GET request to the server to get the HTML to be rendered
- Single page apps will always be on the same page
- JS codes creates an illusion of different pages
- Installation Usage
  - npm install react-router-dom
```
// USAGE OF REACT ROUTER
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Link
} from "react-router-dom"

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
  )
}
```
### According to Manual:
> BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.
- Due to HTML5 history API, BrowserRouter allows us to use URL bar without refreshing the page. Content is only manipulated using Javascript. We can also use the back and forward button as well as bookmarking like traditional web.
- We define links using **Link** component with attribute *to*.
  - Changes the link of URL
- Components are rendered based on path of **Route** component with attribute *path* that matches the URL
- Routes are wrapped in **Switch**, which renders the first component that matches the URL

### Parameterized route
- [useParams().id](https://reacttraining.com/react-router/web/api/Hooks/useparams)
  - Allows the component to access the URL parameter
  - import from 'react-router-dom'
```
<Router>
  <div>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/users">users</Link>
    </div>

    <Switch>
      <Route path="/notes/:id"> // param :id is given    
        <Note notes={notes} />      
      </Route>      
      <Route path="/notes">
        <Notes notes={notes} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>

</Router>
```
```
import {
  // ...
  useParams
} from "react-router-dom"

const Note = ({ notes }) => {
  const id = useParams().id  
  const note = notes.find(n => n.id === Number(id)) 
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}
```
- [useRouteMatch()](https://reacttraining.com/react-router/web/api/Hooks/useroutematch)
  - imported from 'react-router-dom'
  - const match = useRouterMatch('notes/:id')
    - Each time url changes, the hook is ran, if the url matches 'notes/:id'
    - *match* varible will contain an object that we can access to get the parameterized part of the path
    - such as Number(match.params.id)

- [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)
  - Access [history](https://reacttraining.com/react-router/web/api/history) object
  - Can be used to modify URL programatically
  - imported from 'react-router-drom'
  - const history = useHistory()
  - history.push('/')
    - Pushes the url to /, in this case it is HOME
  - all methods with "use" at the beginning are hooks, and there are [RULES](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps/#rules-of-hooks)
    - Such that hooks must not be called from inside of a loop, conditional expressions or any place that is not a function defining component.
    - This is to ensure that hooks are called in order.

### redirect
```
<Route path="/users">
  {user ? <Users /> : <Redirect to="/login" />}
</Route>
```
 
# Custom Hooks
- React offers 10 different built-in hooks
  - Most popular **useState** and **useEffect**
  - **useImparetiveHandle** allows components to provide their functions to other components
- Hooks are not normal functions, we have to adhere to [rules](https://reactjs.org/docs/hooks-rules.html)
  - Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function. 
  - Don’t call Hooks from regular JavaScript functions. Instead, you can:
    - Call Hooks from React function components.
    - Call Hooks from custom Hooks
  - React offer option to create your own custom hooks
    - Custom hooks are regular javascript functions that can use other hooks
    - name must start with "use"
> Building your own Hooks lets you extract component logic into reusable functions.

Examples
```
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

const App = (props) => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={counter.zero}>
        zero
      </button>
    </div>
  )
}
```

### Spread Attributes
```
<Greeting firstName='Arto' lastName='Hellas' />

const person = {
  firstName: 'Arto',
  lastName: 'Hellas'
}

<Greeting {...person} />
```
- Spread syntax is one of the benefit of using custom hooks, it can shorten elements attribute
  - Since custom hooks returns an object, it can be passed into elements or components with spread syntax
- As stated in React documentation, the following 2 ways achieve the exact same results
- Use hooks greatly simplifies the synchronization of state that the form encapsulate
- Custom hooks are not only meant for resusable but also provide a better way to divide our code into modular parts
- More resources on hooks
  - [Awrsome react hooks resources](https://github.com/rehooks/awesome-react-hooks)
  - [Easy to understand React Hook rescipes](https://usehooks.com/)
  - [Why do react hooks rely on call order](https://overreacted.io/why-do-hooks-rely-on-call-order/)
 
# More about styles
### React boostrap (Twitter)
- npm install react-bootstrap
  - Head tag: href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  - In bootstrap all contents are rendered inside [container](https://getbootstrap.com/docs/4.1/layout/overview/#containers)
  - Bootstrap react have built in component such: **table, button, form, alert**
    - import { Table, Button, Forms, Alert, Navbar } from 'react-bootstrap'
    
### Material UI (Google)
- npm install @material-ui/core
- Head tag: `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`
- Renders whole app in `<Container></Container>`
```
import { 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper,
  TextField,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core'
```
  - Alert component is not included in material core
  - npm install @material-ui/lab
    - import { Alert } from '@material-ui/lab'

- **YOU CAN USE [npmtrends](https://www.npmtrends.com/) TO CHECK NPM POPULARITY**
- **[STYLED COMPONENTS](https://www.styled-components.com/) CONSIDERED TO BE THE BEST FOR REACT**
  - npm install styled components

# Webpack
- Developing react was notorious for difficulty in configuration
- Create-react-app made it painless
  - *Under the hood, one of the key player of create-react-app is webpack*
### Bundling
- Old browsers does not know how to handle modules
- For this reason, modules must be bundled for browsers
  - All *SOURCE* code files are transformed into a single file
  - npm run build in react runs a script that bundles the source code

npm run build produces the following files
```
├── asset-manifest.json
├── favicon.ico
├── index.html
├── manifest.json
├── precache-manifest.8082e70dbf004a0fe961fc1f317b2683.js
├── service-worker.js
└── static
    ├── css
    │   ├── main.f9a47af2.chunk.css
    │   └── main.f9a47af2.chunk.css.map
    └── js
        ├── 1.578f4ea1.chunk.js
        ├── 1.578f4ea1.chunk.js.map
        ├── main.8209a8f2.chunk.js
        ├── main.8209a8f2.chunk.js.map
        ├── runtime~main.229c360f.js
        └── runtime~main.229c360f.js.map
```
- It bundles all css in 1 css file and all javascript in 1 file
- Bundling entry point is index.js, is main file that takes whole of apps imports
- Old HTML loads multiple `<script>`, it decreases performance
- Bundling all modules to 1 helps increase performance, HTML only need to load 1 `<script>` file
- HTML should have 1 script tag that access the main.js file

### Webpack configuration
- **npm install --save-dev webpack webpack-cli**
- "script": { "build": "webpack --mode=development" }
- functionality of webpack is defined in **webpack.config.js**
 
```
// Initial content
// Exports and Imports uses node.js syntax
const path = require('path')

// absolute path => path.resolve() 
// __dirname => global varible stores path to current directory
// entry => starting point for bundling
// ouput => where the bundled files will be stored
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),       
    filename: 'main.js'
  }
}
module.exports = config  
```
 
### Bundling React
- By default, webpack only deals with plain Javascript
- to bundle JSX, a [loader](https://webpack.js.org/concepts/loaders/) is required. As JSX is not plain JS
- **npm i -D @babel/core babel-loader @babel/preset-react**
- Loaders are defined under **module** property
  - **definition:** (3 parts)
    - **test** (specifies loader is for .js files)
    - **loader** (specifies processing will be done with babel-loader)
    - **options** (specifies params to configure loader's functionality)
- If react uses async/await, @babel/polyfill is needed - [more info](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined)
  - **npm install @babel/polyfill**
- Most developers used presets, which are pre-configured plugins
  - **npm install @babel/preset-env**
  - this plugin takes in latest features ES6 and ES7 and transpiles to ES5 standard
- CSS
  - **npm i -D style-loader css-loader**
  - css-loader => loads css files
  - style-loader => loads all style elements for that application


**Loader Configuraton**
```
const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {    
    rules: [      
      {        
        test: /\.js$/,        
        loader: 'babel-loader',        
        options: {          
          presets: ['@babel/preset-env', '@babel/preset-react'],        
        },      
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }    
    ],  
  },
}
```
 
### Transpilers
- process of transforming JS code to  another is called [transpiling](https://en.wiktionary.org/wiki/transpile)
- compiles source code and transforming it from one language to another
- babel transpiles JSX codes into JS code, 
- babel currently most popular for the job (2021)
- Most browsers still does not support ES6 or ES7
  - Therefore babel transpiles JSX into ES5 standard version
  
### Webpack-dev-server
- Current configuration makes bad workflow
- Changes to the code requires re-bundling and refreshing browser
- [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) offers solution
  - npm i -D webpack-dev-server
  - "start": "webpack serve --mode=development"
  - and add devServer property to webpack.config.js
```
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  devServer: {    
    static: path.resolve(__dirname, 'build'),    
    compress: true,    
    port: 3000,  
  },  
  // ...
};
```
- running npm start will start dev-server at port 3000
- Changes to code will refresh the page
- the process of bundling with dev-server exists only in memory, not bundled into main.js 
  
### Source Maps
- When errors are displayed in console, the source code is from bundled source code
- adding **devtool: 'source-map'** to webpack.config.js
  - will map errors to the original source code
 
### Minifying the code
- main.js by default is quiet heavy in size because it contains all source code of dependencies
- to optimize we call this **minification**
- most popular tool is [UglifyJS](http://lisperator.net/uglifyjs/)
  - Webpack 4, Uglify does not require configuration
  - **"build": "webpack --mode=produciton"** should be enough 
  - all codes will be in a single line
 
### Development and production configuration
- webpack can also bundle application and point server to certain location
- webpack.config.js object can be changed to a function
  - the function is the exported
  - functions takes 2 arguments
    - env => 
    - argv => access webpack mode defined in npm script
- DefinePlugin({CONST_VARIABLE: JSON.stringify(value)})
  - define global default constants that can be used in bundled code
```
const path = require('path');

const config = (env, argv) => {
  const backend_url = argv.mode === 'production'    
    ? 'https://blooming-atoll-75500.herokuapp.com/api/notes'    
    : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js',
    output: {
      // ...
    },
    devServer: {
      // ...
    },
    devtool: 'source-map',
    module: {
      // ...
    },
    plugins: [
      new webpack.DefinePlugin({        
        BACKEND_URL: JSON.stringify(backend_url)      
      })
    ],
  }
}

module.exports = config
```
**If the development and production configuration differs a lot, then it is better to seperate them**

### Polyfill
- So far, our application should work with most browsers except IE
- IE does not support Promises
- Theres a lot of things that IE does not support
- We need to use [polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill) to add missing functionaltiy to older browser
- Polyfill is added using webpack and babel
- or using polyfill libraries
  - [promise-polyfill](https://www.npmjs.com/package/promise-polyfill)
  - just add the following code to the application
  - [exhaustive list of polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
  - [compatibility of different browser can be checked here](https://caniuse.com/)
```
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}
```

### [Eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)
- create-react-app uses webpack behind the scenes
- If default configuration needs modifying, you can eject the project
- the default configuration files are stored in *config directory* and in *modified package.js*
- once ejected there is no return, configuration will be maintained manually
- alternative to ejecting, you can write your own webpack configuration from the get go
- it is still recommonded to go through the configuration of ejected app, "extremely educational"

# Class components, Miscellaneous
- Without hooks it would not be possible to define components with just functions
- You would require to create components using class syntax
- class components has constructor
- class components only have 1 state
- class component is extended from React.Component
- class component offers no benefits over Functional components except [error boundary](https://reactjs.org/docs/error-boundaries.html)
- Organization of code in React Application
  - [The 100% correct way to structure a React App](https://medium.com/hackernoon/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
- Front end and backend in the same repository
  - fitting front end and back end into the same repository:
    - put package.json and webpack.config.js to root directory
    - then make 2 sub directory to keep frontend and backend source codes
    - **client** and **server**
- changes on the server
  - one way to sync changes in data of the server and frontend is [polling](https://en.wikipedia.org/wiki/Polling_(computer_science))
    - Polling is executed on the front end using setInterval()
  - Another more sophisticated way is to use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
    - Establishes a two-way communication between browser and server
    - does not need to poll, instead, define a callback for when server send back data about updating state
    - It is advisable to not use WebSocket API directly, rather use [Socket.io](https://socket.io/)
    - Graph QL provides a nice mechanism for notifying clients when there are changes to backend data

### Virtual DOM
- Browsers provide a [DOM API](https://developer.mozilla.org/fi/docs/DOM)
- In react, developer rarely or never modify the DOM
- The function returning React Component returns a set of React elements
  - The react elements looks like HTML
  - These elements defining the appearance of the components make up the [Virtual Dom](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)
  - [ReactDOM](https://reactjs.org/docs/react-dom.html) library renders virtual DOM to the real DOM
    - ReactDOM.render(`<App/>`, document.getElementById('root'))
    - Upon stage change, react use previous virutal DOM and compares with the new virtual DOM. Then it changes only whats neccesary.
 
### On the role of React in applications
- React is primarily a library for managing the creation of views
- [Model View Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern, then React is the View
- The state of the components is the Model
- With Redux we can almost seperate logic out of React so React can focus solely on View
  - This is using react "wrongly", however [over-engineering](https://en.wikipedia.org/wiki/Overengineering) is rarely yields an optimal result
  
### React/node application security
- [OWASP](https://www.owasp.org/) publishes an annual list of most common security risk Web application
- One common risk is SQL Injections
  - prevented by [sanitizing](https://security.stackexchange.com/questions/172297/sanitizing-input-for-parameterized-queries) the input
    - checks that query does not contain any forbidden characters
    - If forbidden are found they are replaced with alternatives by [escaping](https://en.wikipedia.org/wiki/Escape_character#JavaScript)
- Another is Cross-site scripting (XSS)
  - Injects JS code into a legitimate web app
- It is important to do security updates on libraries used
- **npm outdated --depth 0**
- **npm audit** can be used to check security of dependencies
- **npm audit fix** to fix the threats
- Another threat is Broken Authentication and Broken Access Control
  - When implementing access control, always check identity in the browser AND server
- Express security article [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html) 
- It is recommended to add library called [Helmet](https://helmetjs.github.io/)
  - Includeds middlewares to eliminate security vulnerability in Express
- Using ESlint [security-plugin](https://github.com/nodesecurity/eslint-plugin-security)

**THE SINGLE MOST IMPORTANT LESSON YOU CAN LEARN ABOUT WEBSITE IS NEVER TRUST DATA FROM THE BROWSER**
**THESE INCLUDES URL, PARAMETERS OF GET, POST, HEADERS, COOKIES and USERS UPLOADED FILES**
**ALWAYS CHECK AND SANITIZE ALL INCOMING DATA**
**ALWAYS ASSUME THE WORST**

### Current trends
- The [dynamic typing](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing) are bugs prone
  - PropTypes enforces type checking for props
  - [Static type](https://en.wikipedia.org/wiki/Type_system#Static_type_checking) is popular
    - Typescript is most popular static type javascript at the moment
      - Developed by microsoft
- Server-side rendering, ismorphic applications and universal code
  - Server-side rendering
    - Visiting a site for first time, server will render a react page
    - After, it will let the browser execute the react app as usual
    - Main motivation is Search Engine Optimization
    - More info: [here](https://www.javascriptstuff.com/react-seo/) and [here](https://medium.freecodecamp.org/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9)
- [Progressive web app](https://developers.google.com/web/progressive-web-apps/)
  - Application is:
    - Able to work flawlessly offline mode -> use [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
    - Able to work with Slow connection
    - Able to still operate on smaller or larger screens
    - Must be installable like anyother application
    - All network traffic should be encrypted
- Microservice Architecture
  - Application in this course is a monolithic backend architecture (simple and singular functionality)
  - Composes the backend from many seperated independent services
  - These services communicate with eachother over a network
  - Each service takes care of a particular logical functional whole
  - Does not use a shared database
  - [API Gateway](http://microservices.io/patterns/apigateway) provides an illusion of "everything on the same server" API
  - Serves the needs for large internet scale apps
  - Trend was set by Jeff Bezoz in 2002
>
  All teams will henceforth expose their data and functionality through service interfaces.

  Teams must communicate with each other through these interfaces.

  There will be no other form of inter-process communication allowed: no direct linking, no direct reads of another team’s data store, no shared-memory model, no back-doors whatsoever. The only communication allowed is via service interface calls over the network.

  It doesn’t matter what technology you use.

  All service interfaces, without exception, must be designed from the ground up to be externalize-able. That is to say, the team must plan and design to be able to expose the interface to developers in the outside world.

  No exceptions.

  Anyone who doesn’t do this will be fired. Thank you; have a nice day!

### [Serverless](https://serverless.com/)
- With cloud computing emerge, it enables *the execution of individual functions in the cloud*
- Not about not have a server, but rather how server is defined.
- Theres no longer a need to define HTTP requests, database relations as it all provide by cloud infrastructure
- Cloud allows well-scaling system
 
### Useful libraries and interesting links
- handling complicated data use [lodash](https://www.npmjs.com/package/lodash) or [ramda](https://ramdajs.com/) for functional programming
- handling datas and times [date-fns](https://github.com/date-fns/date-fns)
- handling forms Formik and redux-form can be used
- hanhdling chars recharts and highcharts are recommended
- handling immutable then use immutable.js 
- [React Google Analytics](https://github.com/react-ga/react-ga) offers analytics of users
- [React best pratices chart](https://reactpatterns.com/) 
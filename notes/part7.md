# React-rtouer
- Application navigation structure
  - In old school web app, changing page requires a HTTP GET request to the server to get the HTML to be rendered
  - Single page apps will always be on the same page
  - JS codes creates an illusion of different pages
  - Installation Usage
    - npm install react-router-dom
```
// USAGE OF REACT ROUTER
import {
  BrowserRouter as Router,
  Switch, Route, Link
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
According to Manual:
> BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.
  - Due to HTML5 history API, BrowserRouter allows us to use URL bar without refreshing the page. Content is only manipulated using Javascript. We can also use the back and forward button as well as bookmarking like traditional web.
  - We define links using **Link** component with attribute *to*.
    - Changes the link of URL
  - Components are rendered based on path of **Route** component with attribute *path* that matches the URL
  - Routes are wrapped in **Switch**, which renders the first component that matches the URL

- Parameterized route
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

- redirect
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

- Spread Attributes
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
- React boostrap (Twitter)
  - npm install react-bootstrap
    - Head tag: href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    - In bootstrap all contents are rendered inside [container](https://getbootstrap.com/docs/4.1/layout/overview/#containers)
    - Bootstrap react have built in component such: **table, button, form, alert**
      - import { Table, Button, Forms, Alert, Navbar } from 'react-bootstrap'
    
- Material UI (Google)
  - npm install @material-ui/core
  - Head tag: 
  ```
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  ```
  - Renders whole app in `<Container>`
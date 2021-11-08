As application grows, state management should be moved outside of React's Components. In this case we will use Redux library which is currently the most popular solution for manging the state of React Application.
# Flux-architecture and Redux 
- Flux architecture
  - Developed by Facebook
  - State is completely seperated from React-Components to **stores**
  - States in stores are not directly changed, but with different **actions**
  - When an action changes a state, the views are re-rendered
  - Action -> Dispatcher -> Store -> View
  - If an action causes the state to change again, this will trigger another re-render
 
- Redux
  - Facebook has an implementation for the Flux architecture
  - However using Redux library is currently more popular
    - Simpler
    - Uses the same principle
    - Facebook also now uses Redux rather than their own original
  - **Installation:**
    - npm install redux
  - Same as flux, Redux also store states in [store](https://redux.js.org/basics/store)
  - The whole state of the application is stored in **one JavaScript-Object** in *store*.
  - Simple states can be saved straight to the store, if state was more complicated then it would be saved as seperate fields of the object
  - The state of the store is changed with [actions](https://redux.js.org/basics/actions) 
    - **actions** are objects which have atleast a field determining the type of the action
      - Example: { type: 'INCREMENT', ... }
      - If other data is required then other fields can be declared in the object as needed. 
      - The impact of the actions to the state is defined using [reducer](https://redux.js.org/basics/reducers)
    - **reducer** is a function that takes current stored state and an action, then returns a new state based on the action types
      - It is is customary to use [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) command instead of ifs in reducer
      - the structure is that you only have 1 single reducer that deals with all actions and states
```
const counterReducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else if (action.type === 'ZERO') {
    return 0
  }

  return state
}

// Using switch

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}
```
  - **Reducer** should never be called directly from application's code
  - **Reducer** should only be given as parameter to the **createStore** function
  - **createStore** function creates the store
  - **Reducers** must be [pure functions](https://en.wikipedia.org/wiki/Pure_function)
    - Pure functions does not cause side effects and always return same response when called with same params
    - Rules of modifying state in react also applied to Redux, never directly modify state object
    - If **reducers** function cause side effects then it breaks the [basic assumption](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#rules-of-reducers)
  - **Reducers** state must be composed of immutable objects so the object cannot be changed 

```
import { createStore } from 'redux'

const counterReducer = (state = 0, action ) => {
  // ...
}

const store = createStore(counterReducer)


console.log(store.getState()) // returns 0
store.dispatch({type: 'INCREMENT'})
console.log(store.getState()) // returns 1
```
  - Store now uses *reducer* to handle *action*, which are dispatched or 'sent' to the store with [dispatch()](https://redux.js.org/api/store#dispatchaction) method
  - [getState()](https://redux.js.org/api/store#getstate) methods returns states in the store
  - third important method the store has is [subscribe](https://redux.js.org/api/store#subscribelistener) which creates callback function the store calls when its state is changed
```
// Will log the store's states whenever a state in the store is changed
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
```

```
// Structure of Redux with React
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
```
  - When state in the store is changed, React is not able to automatically rerender
    - Requires you to register a function **renderApp**, which renders the whole app
    - To listen to changes in the store, store.subscribe(renderApp)
    - Without immediately calling renderApp, the rendering of the app would never happen
  - **When expanding code or adding new functionallity, this should be done in a test driven way**
  - deep-freeze (npm install --save-dev deep-freeze)
    - ensures state cannot be manipulated and that it is immutable
    - deep-freeze(state)
  - {...object, ...} will create a new object with all original object's properties in it
    - You can add and modify properties in the newly duplicated objects
- [Array spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
  - A different approach to Array's concat function
  - const numbers = [1, 2, 3]
  - [**...numbers**, 4, 5] breaks the array up into individual elements to create a new array
  - Destructuring (creating multiple variables from a single object)
```
const numbers = [1, 2, 3, 4, 5, 6]

const [first, second, ...rest] = numbers

console.log(first)     // prints 1
console.log(second)   // prints 2
console.log(rest)    // prints [3, 4, 5, 6]
```
 
- [Uncontrolled form](https://reactjs.org/docs/uncontrolled-components.html)
  - *Uncontrolled forms have certain limitations, for example dynamic error messages or disabling the submit button based on input are not possbile*
  - Uncontrolled form means that the form's input's state are not controlled by the component's state
  - Therefore dynamically updating the state as input changes is not available.
  
- Action creators
  - React components does not need to know Redux action types or forms
  - actions can be separated into their own functions
  - functions that create actions are called [action creator](https://redux.js.org/advanced/async-actions#synchronous-action-creators)
```
// example
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}
```
  - React components does not need to know the inner workings of actions. It just get the right action by calling the [creator function](https://redux.js.org/advanced/async-actions#synchronous-action-creators)
```
const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))    <======= calls createNote(actionCreator)
  }
  
  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))  }

  // ...
}
```
 
- Forwarding Redux-Store to various components
  - Aside from reducer, other components should be separated into its own module
  - However, when components gets separated from parent module (index.js), which holds the *store*, we need a way to access the store
  - one of the ways to access the store is using [hooks api](https://react-redux.js.org/api/hooks) of the [react redux](https://react-redux.js.org/) library
    - npm install react-redux
  - **useDispatch** is a hook used to dispatch actions
    - syntax **const dispatch = useDispatch()**
    - syntax **dispatch(createNote(actionCreator))**
  - [useSelector](https://react-redux.js.org/api/hooks#useselector) is a hook used to select states in the store, it is also a subscription to the store and is ran on every render
    - syntax **const stateName = useSelector(state => state.stateName)**
```
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'import App from './App'  <===== Application is a child to Provider component
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.render(
  <Provider store={store}>  <====== Application is wrapped in <Provider> component with store given as props  
    <App />
  </Provider>,  
  document.getElementById('root')
)
```
  - a reducer function should be exported by default 
    - syntax **export default noteReducer**
    - default exports are imported by **import noteReducer from './reducers/noteReducer**
  - other function, such as action creators in the reducer module can have normal exports
    - syntax **export const createNote = () => {}**
    - normal exports are imported with curly braces **import { createNote } from '.../...**
 
- More components
  - Components that only represent info and has no logic are called [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 
  - Components that contains application logic is called [container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

# Many Reducers
- Combined Reducers
  - When state object become more complicated that holds multiple properties
  - A solution to this is to create other reducers
  - And then combine all the reducers together using the [combineReducers](https://redux.js.org/api/combinereducers)
  - each reducer will manage states that it has been assigned to. 

```
// Reducers blueprint to manipulate states 
// dictated by given actions from actionCreators
export default const noteReducer = (state = data), action) => {expressions}
export default const filterReducer = (state = data), action) => {expressions}

// Mapping of the store
const reducers = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
 
// Creation of the store
const store = createStore(reducers)
```
- Finishing the filter
  - Redux hooks can now be used like so: 
    - useSelector(state => state.notes) // or state.filter
    - useSelector({notes, filter} => { expressions }) // destructuring to get desired results
 
- Redux DevTools
  - [Chrome Extensions](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    - Monitors store and actions from chrome browser's console
  - redux-devtools-extension
    - npm install --save-dev redux-devtools-extension
```
import { composeWithDevTools } from 'redux-devtools-extension'

//...

createStore(reducers, composeWithDevTools())
```
 
# Communicating with server in redux application
- [json-server](https://fullstackopen.com/en/part2/getting_data_from_server) can be used to test
  - create a **db.json** to store all data 
  - "server": "json-server -p3001 --watch db.json"
  - use axios to fetch data from client side
  - all methods that deals with api should be stored in "services" folder
  - when fetching data from server, usually useEffect hook is used.
    - useEffect(() => {...}, [])
- Also keep a note that backend and front should be updated together
  - If a data been changed in the backend, the front should also be updated accordingly
  ```
  // This causes an eslint error
    useEffect(() => {    
      noteService      
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)))  
    }, []) 
  
  // adding dispatch, whenever the given param to dispatch changes, useEffect will retrigger
    useEffect(() => {    
      noteService      
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)))  
    }, [dispatch])

  // We can disable eslint for certain line by adding the line below
    useEffect(() => {    
      noteService      
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)))  
    }, []) // eslint-disable-line react-hooks/exhaustive-deps  
  ```
 
- Asynchronous actions and redux thunk
  - Not great to have server communication inside of components
  - Server communication only need to call action creators
  - redux-thunk
    - Creates asynchronous actions
    - it is a redux middleware
    - must be initialized along with store initialization
      - **npm install redux-thunk**
      - import thunk from 'redux-thunk'
      - import {applyMiddleware} from 'redux'
      - const store = createStore(reducer, composedWithDevTools(applyMiddleware(thunk)))
    - Allows you to create async action creators as follows
```
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}
```
  - principle here is the same: Async operation executed, then action to change state is dispatched
      
# connect(mapStateToProps, mapDispatchToProps)
- Connect is an older and complicated way to use redux
  - In new application you should use hook api
  - However it is good to know connect to be able to maintain older projects using redux
  - **connect help components access action creators and the store through props.**
- Using the connection function to share the redux store to components
  - import { connect } from 'react-redux'
  - exports connected component
  - mapStateToProps(state)
    - Returns a state to be used as props
    - a parameter given to connect()
  - mapDispatchToProps
    - a reference object that contain all action creators 
    - no need to call dispatch as it the action creators has already been modified into a form that contains the dispatch

```
import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

// React Component
const Notes = (props) => {
  // ...
}

// Store state mapping, returns states to be given to connected component
const mapStateToProps = (state) => {  
  return {    
    notes: state.notes,    
    filter: state.filter,  
  }
}

// Action creators mapping, to be connected to component as props
// Remember that action creator can only be called by being dispatched
// However, action creators that are located in here are automatically dispatched
const mapDispatchToProps = {  
  toggleImportanceOf,
}

// Connecting returned state to component as props
const ConnectedNotes = connect(mapStateToProps)(Notes)
export default ConnectedNotes
```
Alternatively to mapDispatchToProps as an object, we can have it as a function. connect() will invoke the function and passing it the dispatch parameter. The return value is an object that defines a group of functions which gets passed into the component's props to be invoked.
```
const mapDispatchToProps = dispatch => {  
  return {    
    createNote: value => {      
      dispatch(createNote(value))    
    },  
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewNote)
```

- Presentational/Container component revisited
  - Presentation components: 
    - Are concerned with how things look
    - May have both presentational and container components inside
    - May have some DOM markup and styles of their own
    - Allows containment via props.children
    - Have no dependencies on the rest of the app
    - Dont specify how data is loaded or mutated
    - Receive data and callbacks exclusively via props
    - Rarely have their own state (when they do, its UI state rather than data)
  - Container components:
    - Are concerned with how things work
    - May contain both presentational and container componets inside
    - Usually do not have DOM markup of their own execpt div wraps and never have styles
    - Provide the data and behaviour to presentational or other components
    - Call redux actions and provide these as callbacks to the presentational components
    - Are often stateful, tend to serve as data sources
    - Are usually generated using higher order component such as connect from react redux
  - Benefits of presentational and contain division:
    - Understand UI and your app better
    - Seperation of concerns
    - Better reusability
      - Can use same presentational component with completely different state sources
    - presentational components are your app's palette
      - Allows designer to tweak all their variations without touching app's logic
  - High Order Components (HOCs) are essentially the same Higher Order Functions (HOFs)
    - HOFs are functions that either accepts a function as a param or returns a functions
    - map, filter, find are all HOFs
  
  "Essentially, a high order component is a function that accept a "regular" component as its parameter, that then returns a new "regular" component as its return value."

  - Redux and the component state
    - Using react the right way
      - React should only focuses on generating the views
      - State should be managed seperately from React components 
      - Managed by Redux, using actions and reducers
    - Redux is good because it:
      - Describe application state as plain objects and arrays
      - Describe changes in the system as plain objects
      - Describe the logic for handling changes as pure functions
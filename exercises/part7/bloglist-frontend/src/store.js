import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  users: usersReducer,
  loggedInUser: loggedUserReducer,
  blogs: blogsReducer,
  notification: notificationReducer
})

// thunk allows writing async functions or functions inside action creators
// action creator returns a function that takes in dispatch and getState params
// this function does not return anything but it must call a dispatch() to update state
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
store.subscribe(() => console.log('State', store.getState()))
export default store
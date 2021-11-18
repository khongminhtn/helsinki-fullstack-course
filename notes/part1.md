# React
1. Uses ES6 
2. JSX
    - under the hood it is compiles to React.createElement()
    - it is compiled by Babel
    - XML-like
3. Core philosophy of react is composing applications from many specialized reusable components
# JavaScript Notes
- Official name of JavaScript standard is ECMAScript
- Latest release is ECMAScript2020 or ES11
- Most transpiles done with Babel
- Node.js is a JavaScript runtime environment
- Variables
    - const defines a value that cannot be changed
    - let defines a normal variable
    - ill-advised to use var as a way of defining variables
 
### Array
- list.push(items) adds items to list
- list.forEach(value => {expressions}) iterates through the list
- Functional programming is often used in React
    - Use of immutable data structures
    - In React, it is preferable to use concat method
        - Creates a new array rather than adding to existing array 
        - list.concat(item)
    - rather than forEach, list.map(value => {expressions}) is used
        - Creates a new list.
    - Destructuring Assisngment
        - t = [1,2,3,4,5]
        - [item1, item2, ..] = t
        - item1 => 1
 
### Objects
- JS common method of defining objects
    - Object Literals -> similar to Python dictionary
- JS does not have classes in the same sense as Object OrientedProgramming
- React containing React Hooks
    - No need to define object's with methods
 
# Component state, event handlers  
- In JavaScript, defining a function within a function is common.
 
### Destructure
- Added to ES6
- Destructure values of objects and arrays
- {name, age} = props
 
### Stateful component
- useState(initialValue) -> value, function to modify value
 
### Event handler
- All event handlers must be referenced to a function
- All event handlers should not have function calls
    - When DOM re-renders, it will go on a loop of constantly calling the function

### Passing State to child components
- Recommended to write React components that are <b>small</b> and <b>reusable</b>
- It is also recommended to lift state up in the component hierarchy
    - As other components in higher hierarchy might also need to make use of changing data
 
### Changes in state cause re-rendering
- Application starts with App being executed
- then uses useState hook to create application's state
 
# A more complex state, debugging React Apps
### New feature "object spread" with syntax {...nameOfObject} added in 2018
- This feature copies all properties of the nameOfObject.
- "it is forbidden in React to mutate state directly"
    - changing state has always been done by changing the state to new object, properties are not changed then it is copied
### Handling Arrays
- adding an item to an Array is done with "concat" method
- do not push items into an array, as this will mutate the list
 
### Most Important rules of Web Development.
- Keep the browser's developer console open at all times
    - Keep both code and console open at the same time all the time
    - typing debugger in console will enable debugging mode
        - you can execute code line by line
        
### Rules of Hooks
- Hooks must not be called inside of a loop, conditional expression or any place that is not a function defining component.
- Ensure that hooks are always called in same order.
- Hooks can must only be called in side a functio body
 
### Events handling revisited
- If a function call is added to the onClick attribute, it will cause an infinite recursion of re-rendering
 
### Do not define components within components
- provides no benefit and leads to many problems
- react treats components inside another component as a new component every render
- Not optimized
    
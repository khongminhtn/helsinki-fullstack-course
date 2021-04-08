# React
### React Notes
1. Uses ES6 
2. JSX
    - under the hood it is compiles to React.createElement()
    - it is compiled by Babel
    - XML-like
3. Core philosophy of react is composing applications from many specialized reusable components
### JavaScript Notes
- Official name of JavaScript standard is ECMAScript
- Latest release is ECMAScript2020 or ES11
- Most transpiles done with Babel
- Node.js is a JavaScript runtime environment
- Variables
    - const defines a value that cannot be changed
    - let defines a normal variable
    - ill-advised to use var as a way of defining variables
- Array
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
- Objects
    - JS common method of defining objects
        - Object Literals -> similar to Python dictionary
    - JS does not have classes in the same sense as Object Oriented Programming
# Login in frontend 
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
  - Local storage is a [key value](https://en.wikipedia.org/wiki/Key%E2%80%93value_database) database in the browser
    - A value corresponding to a certain key is saved to the database using method setItem
    - Setting items:
      - window.localStorage.setItem('name', 'juha tauriainen')
    - Getting items:
      - window.localStorage.getItem('name')
    - Removing item:
      - window.localStorage.remove('name')
    - Clear
      - window.localStorage.clear()
  - Local storage is [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)-specific, so each application has its own storage.
  - Values saved to the storage are called DOMstrings
    - Object has to be parsed to JSON using **JSON.stringify()** before saving
    - When JSON is read from the local storage it has to be parsed back to JavaScript with **JSON.parse()**
  - The correct way to use Local Storage with React is to use [effect hooks](https://reactjs.org/docs/hooks-effect.html)
    - Effect hooks is executed after component is rendered
    - useEffect(() => {}, []) <---- the empty array is set so that the hook is ran once, after render
  - Saving toke in local storage might cntain security risk
    - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) 
      - Happens by allowing user to inject arbitrary JS code
      - However, React sanitizes all texts that it renders that means that it will not execute rendered content as JS
    - It's been suggested that identity of a signed user should be saved as [httpOnly cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
      - JS will not have access to the token
      - Drawback is making SPA more complex
        - Requires seperate page for logging in
      - It has also been suggested that it is not any safer than local storage
  - No matter the solution, it is important to [minimize the risk](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html) of XSS attacks altogether
 
# props.children and proptypes
- { display: 'none' } can hide a whole component
- the component children (props.children)
  - Parent component has closing tag, parent component can access child component by using props.children
  - *children* is automatically added to react and always exists
 
- References to component with ref
  - [ref](https://reactjs.org/docs/refs-and-the-dom.html) mechanism offers a reference to a compnent
  - useRef() is passed to a component as a prop
  - That component then wraps the function that creates the component using 
    - const compName = React.forwardRef((props, ref) => { component })
    - within the body function we useImperativeHandle(ref, () => {
        return (objects passed to ref goes here)
      })
  - Components higher up in the archy will be able to access the referenced objects
  - Hooks that required for this are:
    - useRef()
    - useImperativeHandle()

- PropTypes
  - prop types are allows component to have constraints
  - props can be set to requierd for a component to function
  - prop-types is a third party package
  - prop types can set like so
    - ComponentName.propTypes = { propName: PropTypes.string.isRequired, ... } 
  - if props is not given even though it is required, application would still work, however the console will log some errors and it is extremely unprofessional to leave any red output to the browser

- ESlint
  - ESlint can be used for both front end and backend
  - create-react-app already installed ESlint by default
  - We only need to configure .eslintrc.js file
  - Do not run the 'eslint --init' command, it will install the latest version of ESlint that will not be compatible
  - In order to avoid undesired and irrelevant linter errors, install 'eslint-plugin-jest' package to allow testing easier
  - additional workspace setting might be needed if VS Code is used with ESLint plugin
    - if 'Failed to load plugin react: Cannot find module 'eslint-plugin-react' is shown then additional configuration is needed
    - adding "eslint.workingDirectories": [{"mode": "auto"}] to setting.json seems to work
  - .eslintignore can be created to ignore certain files

# Testing React apps
- Jest is created by facebook and by default it has already been installed with create-react-app
- In addition to jest, curent best option for a testing library to test components rendering is react-testing-library
- Installation
  - npm install --save-dev @testing-library/react @testing-library/jest-dom
- CSS className is used to appoint a component to a test

- Rendering the component for tests
  - Test can be written in same folder as components
  - imports:
    - import '@testing-library/jest-dom/extend-expect'
    - import { render } from '@testing-library/react'
  - syntax:
    - test('name', () => { render() expects() })
  - Normally react components is rendered to DOM
  - however when testing, we use render() to test its contents
    - [render()](https://testing-library.com/docs/react-testing-library/api/#render) returns an object that has several properties
    - property *container* contains all the HTML rendered by the component
 
- Running tests
  - create-react-app configure test to run in watch mode by default
    - test will not exit, but carry on waiting for any changes to the code
    - once new code is saved, test is executed again automatically
    - to run test normall run command **CI=true npm test**
  - console may issue warnings if Watchman is not installed, it watches for any changes made to the files
 
- Test file location
  - Current standard is to keep test files in the same place as the components being tested
  - Or tests files can have their own directory
  - Whichever convention is chosen, it is going to opinionated
 
- debugging tests
  - the object returned by render method has a debug method
  - render(component).debug() 
    - this will log the html content to the console 
  - to search for smaller part of the component we use imported *prettyDOM*
    - import { prettyDOM } from '@testing-library/dom'
      - const li = component.container.querySelector('li')
      - console.log(prettyDOM(li))
  - getByText() method of render() returned object is just one of many queries  react-testing-library offers
  - fireEvent.click(component.getByText('name of button')) is one of the methods that can be used to fire events
 
- Testing the forms
  - fireEvent
    - fireEvent.change({ target: { value: 'contents' } })
      - changes the input within a form
    - fireEvent.submit(form)
      - submits the form
 
- Test coverage
  - command for finding out test coverage
    - **CI=true npm test -- --coverage**
  - the coverage is quietly saved to dir *coverage/icov-report*
  - reports tells us lines of untested code
  
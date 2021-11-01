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
    - component.debug() will print HTML in console
 
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
    - fireEvent.change(querySelector, { target: { value: 'contents' } })
      - changes the input within a form
    - fireEvent.submit(form)
      - submits the form
  - mock functions
    - Mock functions allow you to test event handlers without actual implmentation of the event handler
    - Mock functions can:
      - Capture calls to the function and the parameters passed in those calls
      - Capture instances of constructor functions when instantiated with 'new'
      - Allows test-time configuration of return values
    - You can either create a mock function to use in test code or write a manual mock to override module dependency
    
 
- Test coverage
  - command for finding out test coverage
    - **CI=true npm test -- --coverage**
  - the coverage is quietly saved to dir *coverage/icov-report*
  - reports tells us lines of untested code
  
- Frontend integration tests
  - So far tests for frontend has been unit tests, testing each individual components
  - Unit test is useful at times but it is not enough to validate the application safety as a whole
  - Integration testing tests the collaboration of multiple components
    - More difficult than unit tests
    - Requires Mock Data
    - Requires concentration making end to end test for whole application
 
- Snapshot testing
  - Alternative to traditional testing
  - Developers do not need to define any tests themselves
  - Fundamental Principle:  
    - Compares newly developed HTML code defined by component to its previous version.
    - If changes found, then test will assume that the function have new added functionality or bug been found
    - Developer has to tell jest if the change was desired or undesired
    - If changes was unexpected it strongly implies a bug
    - Developer can be easily aware of this thanks to snapshot testing
  
# End to end testing 
- So far integration test was used for backend to test the API on a whole and uni tests for front end testing each individual component
- End to end testing will be looking at testing the [SYSTEM AS A WHOLE](https://en.wikipedia.org/wiki/System_testing)
- It is possible to do an E2E testing of a web using browser and a testing library
- One of the few libraries used:
  - [Selenium](http://www.seleniumhq.org/)
  - [Cypress](https://www.cypress.io/)
  - [headless browsers](https://en.wikipedia.org/wiki/Headless_browser)
    - Browsers without graphical users interface
    - Chrome can be used in headless-mode
- E2E most useful category of tests
  - It tests the system through the same interface used by users
- Drawbacks: 
  - Configuring E2E is however... more challenging than unit or integration tests
  - Takes longer to test a system, can minutes or hours depending on how big the system is  
    - **This can be problematic because during code it is beneficial to be able to test as often as possible to avoid code [regression](https://en.wikipedia.org/wiki/Regression_testing)**
  - E2E can also be quiet flaky, some tests might pass one time and fail another even when code did not change
 
- Cypress
  - Popular within the last year
  - Easy to use
  - Compared to Selenium, it is less headache and hassle
  - Operation principle is radically different as it runs completely within the browse
    - Other libraries run tests in Node-process, which connects to browser through api
  - Installation:
    - **npm install --save-dev cypress**
    - package.json scripts: **"cypress:open": "cypress open"**0
    - or you can run by typing **npm cypress open** without the added scripts
  - Can be placed in either backend or frontend or their own repository
  - The tests requires the system to be running, it does not start the system when it runs
  - add script to backend package.json to start server in test mode.
    - **"start:test": "cross-env NODE_ENV=test node index.js"**
  - Cypress can only start when both backend and front end are running by running the command
    - **npm run cypress:open**
  - Cypress first execution will create a *cypress* directory
    - Contains an *integration* subdirectory that store our tests
    - Delete sample tests
    - Make our own tests in file *note_app.spec.js*
    - Start the test from the opened window by clicking "Run all specs"
    - Running the tests opens the browser and shows how the application behave as the test run
  - Test Structure
    - Similar to unit and integration tests, it uses *describe" blocks to group different test cases
    - Tests cases are defines with *it* method 
      - Borrowed from Mocha testing library
      - **Mocha stated that using arrow function could causes issues**
  - methods:
    - **cy.visit( web address )** -> opens web address
    - **cy.contains( string )** -> searches for string in the web page
      - if not found, test fails
    - **cy.contains( button name ).click()** -> clicks the button with name found
  
- Writing to a form
  - **cy.get(CSS selectors)** -> searches for elements using CSS selectors
  - **cy.type('what to type')** -> types out the string of given input
  - It is better practice to give id's to inputs and use those id to find the inputs
  - **cy.get('#id-names')** to access an element with given id name
  
- Some things to note
  - **cy.contains('login').click()** algorithmic process
      1. Searches a div that contain 'login' in its content'
      2. selects that div
      3. perform click() operation on that div
  - **install eslint-plugin-cypress** and configure .eslintrc.js to avoid eslint errors
      - **npm install eslint-plugin-cypress --save-dev**
      - go to .eslintrc.js and change to:
          - **"env": { "cypress/globals": true }**
          - **"plugins": [ "react", "jest", "cypress" ]**
  
- Testing new note form
  - Tests always starts from zero any changes made will be reverse back to original state.

- Controlling the state of the database
  - if the test needs to modify the database, then this would make it more complicated
  - Ideally the database should be the same everytime the test is ran
  - As well as unit and integration tests, E2E tests also need to have the database emptied before test ran
  - The Challenge with E2E tests is it cannot access the database
      - Solution -> Create api endpoint to backend for testing
      - Empty database using 3 end points
          - POST /reset .deleteMany({})
          - then add this router to backend application and only allow this when server is ran on *test-mode*
          - make sure to run the server in test mode using *npm run start:test* which was configured in package.json
  - **cy.request('Method', 'endPoint', body)**
  - **cy.request({url, method, body, headers})**
  
- Failed login test
  - **cy.get().should('contain', 'contents')** -> [should()](https://docs.cypress.io/guides/references/assertions.html#Common-Assertions) is trickier to use, but it is more diverse
      - list of common assertions
      - should() can only be chained from cy.get() method
  - Examples of should:
  ```
  cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color, 'rgb(255, 0, 0))
      .and('have.css', 'border-style', 'solid')
  ```
  ```
  cy.get('html').should('not.contain', 'content')
  ```
  - should() method should always be chained with get()
  
-  Bypassing the UI (Cypress commands)
  - Cypress suggests that we logging in using HTTP requests in the test rather than the UI because it is faster than filling in the UIs
  - Custom commands
      - Created in *cypress/support/command.js*
      - Blue print
          - Cypress.Commands.add('nameOfCommand', (params) => { expressions })
      - Using created command
          - cy.nameOfCommand(params)
  
- Changing the importance of a note
  - Should check the test runner to make sure that the test is selecting the right component
  - chain commands to continue working with the selected component
      - cy.get('.component2').contains('contents') contains command will search for content in component2 rather than the first content it finds in the html
      - find(selector) will search for given selectors 
      - Chaining commands can also use .parent().find('button') to search for buttons in its parent element
          - using get() in this situation to find elements will search the whole page rather than the chosen elemens
      - You can also save elements by using as('nameSaved') and access it by cy.get('@nameSaved')
  
- Running and degbugging
  - When cypress runs a test, it adds each **cy** command to an execution queue
  - Cypress execute each command 1 by 1 
  - Cypress commands always returns undefined
  - Cypress commands are like promises
      - to access it's return values, you need to use then command
      - cy.get('element').then((params) => {expressions})
  - stopping the test execution with debugger() is possible
      - debugger() starts only if Cypress test runner's developer console is open
      - Developer console is all sort of useful when debugging
      - It shows you information about the test
  - So far we run the test graphically, however we can add npm script
      - package.json "test:e2e": "cypress run"
      - npm run test:e2e
 
# BONUS: Cypress documentation
- Cypress is next generation front end testing tool for modern web
- Making it easier for developers to:
  1. Set up tests
  2. Write tests
  3. Run tests
  4. Debug tests
- Cypress often compared to Selenium
  - However cypress is faster, easier and more reliable due to less restrictions
- Who uses Cypress ?  
  - Developers and QA Engineers building web apps using modern JS frameworks
  - Enables you to write:
    1. E2E tests
    2. Integration tests
    3. Unit tests
- Cypress ecosystem
  - Integration of Cypress witih CI Provider, Cypress Dash Board Service can record test runs
  - You can track where your tests fails
- Features
  1. Time Travel
    - Cypress Takes snap shots as test runs and give details on each steps
  2. Debuggability
    - Debugs directly from **Developer Tools**
  3. Automatic Waiting
    - No need to add waits or sleeps to the code Cypress automatically waits for commands and assertions before moving on
  4. Spies, Stubs and Closk
    - Verifies and control behaviour of functions, server responses and timers
  5. Network Traffic control
    - Control, stub and test edge cases without involving server
  6. Consistent Results
    - Cypress Architecture does not use Selenium or WebDriver, so it is fast, consistent and reliable
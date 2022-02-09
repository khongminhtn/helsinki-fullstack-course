# Background and introduction 
 
- TypeScript is a programming language designed for large scale JS projects

### Main Principle
- Superset of JS
- Compiled into JS
- Versions can be decided on ECMAScript 3 or higher
- **TypeScript consist of three seperate fulfilling parts:
  1. Language
  2. Compiler
  3. Language Service
 
1. Language
  - Consists:
    - Syntax
    - Keywords
    - Annotations
2. Compiler
  - Responsible:
    - For Removing the typing information
    - For code transpiling
      - Transform TS into JS executable codes
      - All types are removed at compile time
      - Not genuinely statically-typed code
      - From 1 human readable code to another, not to machine codes
3. Language Service:
  - Collects:
    - Information from source code
    - Development toosl can use type info to provide intellisense, hints, refactoring alternatives
 
### TypeScript key language features
 
**Type Annotations**
- record intended *contracts* of a function variable
- What type of the variables will be and what type will it return
```
const birthdayGreeter = (name: string, age: number): string => {''}
```
 
**Structural Typing**
- TS is structural typed language
- Structural typing, 2 elements must be compatible with one another
- compatible elements are elements that has identical features 
 
**Type Inference**
- TypeScript compiler can infer the type info if no type has been specified
- TypeScript compiler will assume that the function returns a type number if both given params are of type number
 
### Why should one use TypeScript ?
1. First advantage
  - Offers type checks and static code analysis
  - Reduces run time errors and possible reduce unit tests required
2. Second advantage
  - Type anotations can function as code-level documentation
  - Makes it easier for new programmers to start with old projects
  - Types can be reused around the code base, one change can reflect everywhere
3. Third advantage
  - IDEs can provide more specific and smarter intellisense when they know exactly what types you are processing
 
### What does TypeScript not fix ?
- Type checking and annotations only work at compile time, not run time
- Errors can come when handling external input such as data received from network requests
1. Incomplete, invalid or missing types in external libraries
2. Sometimes, type script will infer types that we do not intend
  - We can use type assertions to force and replace that type another type
  - Only use type assertions if we absolutely know what we are doing
  - Check [Type Assertions](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) and [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)
3. Mysterious type errors
  - Rule of thumb, TS error messages have most useful info at the end
  - When message are long and confusing, read the end first.
 
# First Steps with TypeScript
### Setting things up
- Type Script is not executable by itself, it compiles/transpile into JS before execution. This compile/transpile subjects to type erasure
- Production environment compilation needs setting up a **build step**
- Build step, TS compiled to JS in a seperate folder
- Production environment then runs JS in that folder
 
Installation:
- **npm install -g ts-node typescript** Global installation
- **npm install --save-dev ts-node typescript** Local installation 
- **npm install -D tslib @types/node** Some cases
- To use ts-node, run *npm run ts-node*
- If running ts-node through package.json, all command-line arguments needs to be prefixed with --
  - **npm run ts-node -- file.ts**
 
package.json
```
//...
"scripts": {
  "ts-node": "ts-node"
}
```
 
Note about coding style:
- General TS coding style is to use semi-colon
- [Comprehensive list of types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
 
### Creating your first own types
- **type** keyword defines a new name for a type, known as **type alias**
- Its important to document what type is being returned
- The default type of error is **unknown** as of TS 4.0
```
type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

const calculator = (a: number, b: number, op: Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  console.log(calculator(1, 5 , 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
```
 
### @types/{npm_package}
- TS expects all globally-used code to be typed
- TS library itself only contains typings for TS package
- Custom typings almost never needed as TS community has done most of it
- You also dont have to create thousands of type for your dependencies as it can be found from the community
- Since typings are only used at compilation, typings should be installed under devDependencies of package.json
- To use JS packages in TS, typings of that specific package needs to be isntalled such as **@types/node**]
 
### Improving the project
- To create command-line params, we use ``process.argv[paramValue]``
- This params can be executed by commands given to scripts in package.json
- [Interface](http://www.typescriptlang.org/docs/handbook/interfaces.html) keyword used when defining types that are objects
 
### More About tsconfig
- So far, the above only uses **noImplicitAny** configuration
- **tsconfig.json** contains all core config on how you want TS to work on your project
- **node_modules** is excluded by default
- For information of the functionality of each config look [here](https://www.staging-typescript.org/tsconfig)

An example: (tsconfig.json)
```
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```
 
### Adding express to the mix
- A good rule of thumb is to use import statement when importing modules
- Make sure that types are installed for the packages, in this case @types/express
- if import does not work we use *import ... = require('...')*
- Unused params can have _ added to it to let compiler know that you are aware of its problem, but nothign u can do it about **_params**
- ts-node-dev is replacement of nodemond for ts. Responsible for recompiling upon every changes

## The horrors of any
- Variables that is untyped cannot be inferred becomes implicitly becomes type **any**
- This is why it is important to keep the **noImplicityAny** on in **tsconfig.json**
- Only use any in occasions when you truly cannot know what type it is
- Some TS packages have their variables typed as any by default
  - This can be solved using **eslint** and its TS extensions
  - **npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser**

.eslintrc
```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": 2  } // Might already be default
}
```
 
package.json
```
{
  // ...
  "scripts": {
      "start": "ts-node index.ts",
      "dev": "ts-node-dev index.ts",
      "lint": "eslint --ext .ts ."      
      //  ...
  },
  // ...
}
```
 
Course's choice of setting .eslintrc
```
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```
 
# Typing the express App
- **Above demonstrates basic understanding of TS**
- The following parts will demonstrate creation of cases that are more realistic
- **Will no longer use ts-node**
- In the long run it is advisable to use official TypeScript compiler
 
### Setting up projects
- **npm install typescript --save-dev**
- **add "tsc": "tsc" to "scripts" in package.json**
  - Helps initialize project by generating tsconfig.json file
  - **npm run tsc** to build production environment
    - converts TyperScript (.ts) codes in to JS code (.js)
- initiate tsc by running **npm run tsc -- --init**
- Starting a project, it is good to use ESLint from the beginning to keep high code standard
- Dont forget to install third party **types** for packages
- Working with real world project, preparation is incredibly important to keep things running smoothly

Using express and eslint for the project
```
npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev ts-node-dev
```

tsconfig.json
```
// Running the tsc init will give us a lot of commented out options
// These however are the ones we are interested in
{
  "compilerOptions": {
    "target": "ES6",    // ECMAScript version
    "outDir": "./build/",   // Location of compiled code
    "module": "commonjs",   // Which modules to use in compiled code
    "strict": true,   // Shorthand for seperate coding style options
    "noUnusedLocals": true,   // prevents having unused local variables
    "noUnusedParameters": true, // throws errors for unused params
    "noImplicitReturns": true, 
    "noFallthroughCasesInSwitch": true, // Switch cases ends with return or break
    "esModuleInterop": true   // Interoperability between CommonJS and Es Modules
  }
}
```
 
.eslintrc
```
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```
 
package.json
```
{
  // ...
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev index.ts",    
    "lint": "eslint --ext .ts .",
    "start": "node build/index.js"
  },

  // ...
}
```
 
### Let there be code
- **npm node build/index.ts** will create a production build 
- To avoid eslint from analyzing the build dir we add it to **.eslintignore**
 
### Implementing functionality
- First is decisions on structure of source code
- Source code recommended to be in */src* dir
  - Avoid mixing with configuration files
- All routers to be placed in */src/routes* dir
  - Within /routes each file will be responsible for handling specific resources
- We can prefix routes using **app.use('/prefix/url', specificRouter)** in index.ts
- Data manipulation should not happen in routes
- It is important and common to seperate business logic from the router code
- All business logics/data manipulation can happen in */src/services* module
- This approach originates from [Domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design)
- Custom types should be created seperately in */src/types.ts*
- Never use **typer assertions** unless theres no other way
- When working with JSON make sure to convert json to ts file
 
/src/routes/diaries.ts
```
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diaries!');
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
```
 
/src/index.ts
```
import express from 'express';
import diaryRouter from './routes/diaries';const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter); // Prefixing url to diaryRouter

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

src/types.ts 
```
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;    // the ? means that this field is optional
}
```

/src/services/diaryService.ts
```
import diaryData from '../../data/diaries.json';

import { DiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {  
  return diaries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
```
### Node and JSON modules
- In tsconfig.json, "resolveJsonModule" will resolve in order of extension
  - ["js", "json", "node"]
- By default ts-node and ts-node-dev extends the list
  - ["js", "json", "node", "ts", "tsx"]
- In a flat folder that contains 
  - myModule.json
  - myModule.ts
  - import myModule from './myModule'
  - This will import .json instead of the intended .ts file due to order of extensions
- This is why in flat dir, it is recommended to have different file names and not the same name
 
### Ultility Types
- [Pick](http://www.typescriptlang.org/docs/handbook/utility-types.html#picktk) allows us to choose which fields of existing type to use
- Pick can be used to construct a completely new type
- Or it can inform a function what to return
- We can use **Omit** to avoid 
- When using utility types, make sure to remove the fields ourselves when returning, as TypeScript will only remove the types, not the fields. 
  - If this is not done, we will be leaking important info to the browser

Example
```
const getNonSensitiveEntries =
  (): Array<Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>> => {
    // ...
  }

// Alternative syntax
const getNonSensitiveEntries =
  (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
    // ...
  }

// Alternative type utility 'Omit' for to remove only 1 type
// This will not return comment field
const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
  // ...
}

// Another alternative is to add the follow line to where DairyEntry 
// custom type is located
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
 
// Maping returned data to avoid data leak
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {  
  return diaries.map(({ id, date, weather, visibility }) => ({    
    id,    
    date,    
    weather,    
    visibility,      
  }));
};
```
 
### Preventing an accidental undefined result
- In some occasion where the result of an operation returns "undefined"
- TS will notify this before compiling phase
- Worst case scenario, an undefined object would be returned
- Rather than informing users of the unfound item
- In this case we should:
  1. Define what returned object would be
  2. Define how the case should be handled
 
### Ading a new diary
- If parameters that's given to a function is overwhelming
- Create an type for an object and pass all those param in the object
```
const addDiary = (date: string, weather: Weather, visibility: Visibility, comment: string ): DiaryEntry => {

  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    date,
    weather,
    visibility,
    comment,
  }

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

// Alternatively, create a type for an object "NewDiaryEntry"
const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {  
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
```
 
### Proofing requests
- External data from outside sources can never be trusted
- There is no way that it can already be typed
- We can create a folder called ultils,
  - This folder will have function that returns the proper type
  - It will take in the request body to resolve
  - The functions can take the object as type unknown
  - It will also contain type guards
 
Type Guard
- A function which returns a boolean
- Return **type predicate**
- In the following case, the predicate type is "text is string"
  - Where *text* is the function param
  - string is the targeted type for comparison
- Returns a boolean, either true or false
- This is a helper function
- It is only required when types of other function is unknown
- So we use **type guard** to **predicate** whether the type meets the condition
- When validing types against an list type, we should use **enum** type to create an object type and initialize its value
- use **Object.value(EnumType)** to convert it to JS object
- and then use **includes(param)** to check if the value is inside the enum
- Enums are typically used when there is a set of predetermined values that are not expected to change in the future
```
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// 2 conditions is used instead of just "typeof text === string"
// because we want to be absolutely sure that it returns type string

const a = "I'm a string primitive";
const b = new String("I'm a String Object");
typeof a; --> returns 'string'
typeof b; --> returns 'object'
a instanceof String; --> returns false
b instanceof String; --> returns true

// Using enum 
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

// Rather than 
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};
```
 
Unknown type:
- types given as param that is unknown, cannot have any operation on it
- If we expect the type to be an object we have to destructure it
- or we could disable lint rules and use **type any**
```
// This is performing operation on type unknown and TS would not compile
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };

  return newEntry;
};

// Instead we have to destructure the param and create a type for it
type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility)
  };

  return newEntry;
};
```
 
# React with Types
- If working properly, TS will help catch follow errors:
  1. Trying to pass an extra/unwanted props to a component
  2. Forgetting to pass a required props to a component
  3. Passing a prop of a wrong type to a component
- TS helps catching these error early due to strict typing
- **npx create-react-app my-app --template typescript**
- **npm start**
- Instead of .js and .jsx, files are now .ts and .tsx
- **tsconfig.json** 
  - **allowJs** if set to true
    - It allows mixing *js* and *ts* files
- React typically returns JSX.Elements or null
  - We can disable (eslint):
    - **explicit-function-return-type**
    - **explicit-module-boundary-types**
- Eslint needs to also lint **.tsx** files.
  - Change lint command:
    - "lint": "eslint \"./src/**/*.{ts,tsx}\""

### React components with TypeScript
- React components are mere functions
- We will no longer need prop-types package
- We use type interface, extensions and unions for the parameters and JSX.Element as return type
 
Examples
```
const MyComp1 = () => {
  // TypeScript automatically infers the return type of this function 
  // (i.e., a react component) as `JSX.Element`.
  return <div>TypeScript has auto inference!</div>
}

const MyComp2 = (): JSX.Element => {
  // We are explicitly defining the return type of a function here 
  // (i.e., a react component).
  return <div>TypeScript React is easy.</div>
}

interface MyProps {
  label: string;
  price?: number;
}

const MyComp3 = ({label, price}: MyProps): JSX.Element => {
  // We are explicitly defining the parameter types using interface `MyProps` 
  // and return types as `JSX.Element` in this function (i.e., a react component).
  return <div>TypeScript is great.</div>
}

const MyComp4 = ({label, price}: {label: string, price: number}) => {
  // We are explicitly defining the parameter types using an inline interface 
  // and TypeScript automatically infers the return type as JSX.Element of the function (i.e., a react component).
  return <div>There is nothing like TypeScript.</div>
}
```
 
### Deeper Type usage
In the case of a list of data with inconsistent fields, we can create multiple interfaces with the different fields and extend the fields that are common to eachother and then combine these interfaces into 1 single type
- When we have manually declared a type union or TS had infered that it is of type Union, we can use switch case to deal with this kinda of type.
- When there is a field that has not been typed, we need to create a method to deal with such errors to return an error
 
**Data**
```
const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];
```
 
**Multiple Interfaces for field differences**
**Extend the common fields to the base type**
**This is extended type union**
```
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
```
 
**Dealing with type union and errors**
```

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Dealing with unions
courseParts.forEach(part => {
  switch (part.name) {
    case "Fundamentals:
      // TS knows we can use name, exerciseCount and description
    case "Using props to pass data":
      // TS knows we can use name, exerciseCount and groupProjectcount
    case "Deeper type usage":
      // TS knows we can use name, description and exerciseSubmissionLink
    defaul:
      return assertNever(parts);
  }
});
```
 
### A note about defining object types
- We can use **interface** and **type** to define our types
- However when 2 interfaces has the name, it merges. Whereas type will give error
- TS doc recommends using interfaces
```
interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
} 

type DiaryEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
} 
```
 
### Working with an existing codebase
- Reading code is a skill, the more you read, the better you are
- Its ok to not understand 100% of existing code base
- If app is properly structured, you can trust to make careful modifications and the app will still work
- Over time you will understand the unfamiliar parts, but does not happen over night
- When working with existing code base. Look into:
  1. README.md
  2. package.json
  3. folder structure
    - Insight into functionaltiy and architecture used
  4. Unit, Integration or E2E tests
    - Important for modifying and adding new features

### Patientor frontend
- Small application, useContext and useReducer will make state management global, allow components accorss the app to access
- Very similar to redux
```
// "Patient | undefined" ensures that app throws error if key being accessed does not exists
export type State = {
  patients: { [id: string]: Patient | undefined}; 
};

// Alternatively, Using Map to declare a type for both key and value
interface State {
  // equivalent to patient: { [id: string]: Patient }
  patients: Map<string, Patient>; 
}

// Map Accessor get() always returns union of declared value
// type for myPatient is now Patient | undefined
const myPatient = state.patients.get('non-existing-id'); 
```

- Main ingredient is useReducer
  - Creates state and dispatch function
  - Passes them to context provider for global component access
```
Give access to dispatcher and states to all its children (components)

// state.ts
export const StateProvider = ({reducer,children}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);  
  return (
    <StateContext.Provider value={[state, dispatch]}>      
      {children}
    </StateContext.Provider>
  );
};

// index.ts
import { reducer, StateProvider } from "./state";

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>, 
  document.getElementById('root')
);
```
 
- Components use the following custom hook to access state and dispatcher
```
// state.ts
export const useStateValue = () => useContext(StateContext);

// component.tsx
import { useStateValue } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
}
```
 
### Patient listing page
- Passing parameter to axios will not validate any data
- It is quiet dangerous if you are using external APIs
- You can instead, create a custom validation functions or use type guard
- This is due to the fact that data's structure can change over time
 
```
// Given type to the states
// In this case modalOpen is of type boolean
// error is of type string or undefined
const [modalOpen, setModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();
```
 
### Full entries
- Data with inconsistent fields
  - Have both common and specific fields
  - Common fields are determining field for Type's name/identifier.
- Create a base types
  - carry all the common fields of the data
- Extend the different fields in each type
  - Contain uncommon fields with an identifier

### Add Patient Form
- Formik:
  - Getting values in and out of form state
  - Validation and error messages
  - Handling form and submission
- Formik help make dealing with forms easier
  - Testing
  - Refractoring
  - Reasoning
- Formik are components which wraps the following
  - label
  - fields
  - error messages
 
Example
```
interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
```
 
Accessing Error Messages
```
export const TextField = ({ field, label, placeholder, form }: TextProps) => {
  console.log(form.errors); 
  // ...
}
```
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
2. Sometimes, type inference needs assistance
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
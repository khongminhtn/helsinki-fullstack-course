# GraphQL-Server
- Developed by facebook
- Philosophy is very different to REST
- REST is resource based
  - Operations done to resource are HTTP request to its URL
- **MAIN PRINCIPLE**:
  - Forms query describing data wanted, sends to API with POST request
  - Unlike REST, all GraphQL queries are sent to same address, with POST
  - Logic stays simple and gets exact data needed
- Schemas and queries
  - Schema is the heart of all GraphQL apps
  - Schema describes the data sent between client and server
  - Direct link between query and returned JSON Obj
  - Describes only data moving between server and client
  - On server, data can be saved anyway they like
- Examples
  - In schema, types must have a type name and its fields
  - Scalar type => Fields must be given a value
  - Query type => Fields describes a query given to server and value it returns
  - ! marks are used to mark which return values are Non-Null

```
// example of phone schema
type Person {
  name: String!
  phone: String
  street: String!
  city: String!
  id: ID! 
}

type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
}
```
 
```
// Making a query
query {
  personCount
}

// returns
{
  "data": {
    "personCount": 3
  }
}
```
 
```
// Making a query for list of objects
query {
  allPersons {          // Get all person object
    name                // specify what fields to return
    phone
  }
}

// Returns 
{
  "data": {
    "allPersons": [
      {
        "name": "Arto Hellas",
        "phone": "040-123543"
      },
      {
        "name": "Matti Luukkainen",
        "phone": "040-432342"
      },
      {
        "name": "Venla Ruuska",
        "phone": null
      }
    ]
  }
}
```
 
```
// Making a query, takes a param
query {
  findPerson(name: "Arto Hellas") {        // Find Arto Hellas
    phone                                  // Return these fields only
    city 
    street
    id
  }
}

// Returns
{
  "data": {
    "findPerson": {
      "phone": "040-123543",
      "city": "Espoo",
      "street": "Tapiolankatu 5 A"
      "id": "3d594650-3436-11e9-bc57-8b80ba54c431"
    }
  }
}
```
 
### [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
  - Today's leading GraphQL-server libray
  - **npm install apollo-server graphql**
  - **const { ApolloServer, gql } = require('apollo-server')**
  - ApolloServer is the heart of the code
    - Takes 2 params (defines how GraphQL queries)
      1. typeDefs => Contains GraphQL schema
      2. resolvers => 

```
// INITIAL CODES
const { ApolloServer, gql } = require('apollo-server')

// DATABASE
let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

// GQL Schema
const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

// Defines how GQL queries are responded to
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
```

### GraphQL - playground
- located at: http://localhost:4000/graphql
- Playground is loaded when server is ran in dev mode
- Used to make queries to server
- red bar indicates where the query is going wrong
- DOCS shows the schema of server

### The default resolver
- When query, server send exactly the field required
- This is because GraphQL must define resolvers for each field of each type  in the schema
- When resolvers is not defined, Apollo will define a default resolver
- Default resolver will have param **root** where it can access data object
- If default resolver is enough then it is recommended that you define it
```
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => persons.find(p => p.name === args.name)
  },
  // Defaul Resolver...
  Person: {    
    name: (root) => root.name,    
    phone: (root) => root.phone,    
    street: (root) => root.street,    
    city: (root) => root.city,    
    id: (root) => root.id  
    }
  }
```

### Object within an Object
- Object within objects needs to have their own schema and resolvers

### Mutations
- GraphQL operations that causes change are mutations
- Mutations are defined in the schema as **Mutation**
- Mutation returns a details of the operation and if fail, will return null 
- Mutation also require resolver to write logic
```
const { v1: uuid } = require('uuid')

type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
}

const resolvers = {
  // ...
  Mutation: {
    addPerson: (root, args) => {
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    }
  }
}

// addPerson() Adds the person 
// follow { } returns an object in that structure
mutation {
  addPerson(
    name: "Pekka Mikkola"
    phone: "045-2374321"
    street: "Vilppulantie 25"
    city: "Helsinki"
  ) {
    name
    phone
    address{
      city
      street
    }
    id
  }
}
```

### Error handling
- Some errors handling can be done automatically with GraphQL validation
- Some  GraphQL errors has to be handled manually 
- Example: Stricter Mutations rules must be added manually 

### Enum
```
// Query all person with phone number only
query {
  allPersons(phone: YES) {
    name
    phone 
  }
}

// Query all person with no phone number
query {
  allPersons(phone: NO) {
    name
  }
}

// Schema
enum YesNo {  
  YES  
  NO
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person!]!  
  findPerson(name: String!): Person
}

const resolver = Query: {
  personCount: () => persons.length,
  allPersons: (root, args) => {    
    if (!args.phone) {      
      return persons    
    }    
    const byPhone = (person) =>      
        args.phone === 'YES' ? person.phone : !person.phone    
    return persons.filter(byPhone)  
  },  
  findPerson: (root, args) =>
    persons.find(p => p.name === args.name)
},
```

# React and GraphQL 
- Communitcation between React and GraphQL works by REST POST to the address of apollo server
  - In this example http://localhost:4000/graphql
- **We could use Axios but this is recommonded to avoid**
- Instead we use "higher-order" library
  - capable of abstracting unnecessary detail
  - We can use:
    - Relay (Facebook)
    - Apollo Client (Most popular)
  
### Apollo Client
  - **npm install @apollo/client graphql**
  - Apollo Client is used to communicate with GraphQL server
  - Allows react to send query to server
```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

// Creates new Client to communicate with GRAPHQL server
// Useds to send query to server
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

// Query structure
const query = gql`
query {
  allPersons {
    name,
    phone,
    address {
      street,
      city
    }
    id
  }
}
`

// Sends query and retrieve its data from response
client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.render(<App />, document.getElementById('root'))
```
 
### Making queries 
- Client can be made accessible to components by wrapping App component with ApolloProvider component
```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client' 

// Creates client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

// Allow client to accessible to child components
ReactDOM.render(
  <ApolloProvider client={client}>    
    <App />
  </ApolloProvider>,  document.getElementById('root')
)
```
 
- Query is made using dominantly **useQuery**
- Returns an object with multiple field
  - *loading* true or false
- Once response received *data* field will be availble to access data
```
import React from 'react'
import { gql, useQuery } from '@apollo/client'

// Structure of query
const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
        </div>  
      )}
    </div>
  )
}

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <Persons persons = {result.data.allPersons}/>
  )
}

export default App
```
 
### Named queries and variables
- GraphQL built in Variables allows dynamically changing params given to queries
- **useLazyQuery(gql)** is good for querying with variables 
- first you define the type $variableName: String!
- then you consume the varible functionName(name: $variableName)
```
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone 
    address {
      street
      city
    }
  }
}
```
```
const FIND_PERSON = gql`  
  query findPersonByName($nameToSearch: String!) {    
    findPerson(name: $nameToSearch) {      
      //..  
  }
`

const Person = ({ persons }) => {
  // when an event call getPerson, it will trigger the hook useLazyHook()
  // response will be stored in result
  const [getPerson, result] = useLazyQuery(FIND_PERSON)   
  const [person, setPerson] = useState(null)

  // getPerson takes an object with a field varible and its value as an object with all dynamic variables
  const showPerson = (name) => {    
    getPerson({ variables: { nameToSearch: name } })  
  }
}
```
 
### Cache
- Client will make a query and then save the data and query to cache
- Next query, it will retrieve data from cache rather than the server
- Apollo Client cannot automatically update the cache of an application when adding data
- except when manipulating exisitng data in the cache with ID types
- added data needs to be reloaded or update the cache
 
### Doing mutations
- to use Mutation in React, we use **useMutation**
 
```
import { gql, useMutation } from '@apollo/client'

const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

const PersonForm = () => {
  //...
  const [ createPerson, result ] = useMutation(CREATE_PERSON)

  const submit = (event) => {
    //..
    createPerson({ variables: {name, phone, street, city} })
    //..
  }
  
  return(//...)
}
```
 
### Updating the cache
1. You can make the query to poll every 2 seconds **useQuery(ALL_PERSONS, { pollInterval: 2000 })**
2. Or you can refetch the query every mutation 
**useMutation(CREATE_PERSON, {refetchQueries: [ { query: ALLPERSONS } ] })**
- You can seperate all gql query instructions in a file *queries.js*
- Then you can import queries: **import { ALL_PERSONS } from './queries'**
 
### Handling mutation errors
- errors can be handled using onError option of useMutation hook
const PersonForm = ({ setError }) => {
  // ... 

  const [ createPerson, result ] = useMutation(CREATE_PERSON, {
    refetchQueries: [  {query: ALL_PERSONS } ],
    onError: (error) => {      
      setError(error.graphQLErrors[0].message)    
      }  
    })

  // ...
}
 
### Apollo Client and the applications tate
- Management of application state mostly becomes Apollo Client's responsibility
- No justifiable reasons to use Redux if GraphQL is used.
 
# Database and user administration
### Mongoose and Apollo
- **npm install mongoose mongoose-unique-validator**
- It is good to keep validation in database
- **_id** field GraphQL will automatically parse to **id**
- Resolver also now return a promise, previous returned normal objects
 
### Validation
- Validation now handled by mongoose so in Mutation, try and catch should be used to catch any errors in the case of invalidation
 
### User and log in
- The new [context](https://www.apollographql.com/docs/apollo-server/data/data/#context-argument) parameter 
```
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {}
})

Query: {
  //..

  me: (root, args, context) => {
    return context.currentUser
  }
}
```
 
### Friends list
**use $in in mongoose search to match any item in the database and return the whole field.**
- Model.find({ genre: { $in: "database" }})
- ```returns object that contain genre: ["database"]```
 
# Login and updating the cache
### User Login
- Login by querying login mutation to GraphQL
- Store token in both react app and local storage using useEffect hook
- to log out, useApolloClient().resetStore() to clear off cache and clear local storage
 
### Adding a token to a header
- in order to add header to requests we use **setContext**
```
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {  
  const token = localStorage.getItem('phonenumbers-user-token')  
  return {    
    headers: {      
      ...headers,      
      authorization: token ? `bearer ${token}` : null,    
    }  
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
```

### Updating cache, revisited
- initially, to update cache, we pass a 2nd param to useMutation() 
  - [ { refechtQueries: {query: ALL_PERSONS } ]
- However, we can update the cache ourselves by passing a call back function to **update**
  - (store, response) => {}
    - **store** = reference to the cache
    - **response** =  data return from the mutation 
- readQuery will throw errors if cache does not contain necessary data
- Some situations only sensible way to update cache is **update**
- When necessary, dis able cache or [single queries](https://www.apollographql.com/docs/react/api/react/hooks/#options)
- **Be careful with cache as it can cause hard-to-find bugs**
> There are only two hard things in computer science: cache in validation and naming things
```
const PersonForm = ({ setError }) => {
  // ...

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {      
      // Read the cache state using readQuery and then passing it to dataInStore variable
      const dataInStore = store.readQuery({ query: ALL_PERSONS })

      // using writeQuery to update the cache       
      store.writeQuery({        
        query: ALL_PERSONS,        
        data: {          
          ...dataInStore,          
          allPersons: [ ...dataInStore.allPersons, response.data.addPerson ]        
        }     
      })    
    } 
  })

  // ..
}
```
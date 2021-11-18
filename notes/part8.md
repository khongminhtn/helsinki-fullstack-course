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
  - npm install @apollo/client graphql
```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

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

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.render(<App />, document.getElementById('root'))
```
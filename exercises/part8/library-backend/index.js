const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

// DATA
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

// Defining Schemas
// Structuring the data and queries
// Think of the schema as the blue print and resolver is the functionality
const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: String!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    books: [Book],
    bookCount: Int!,
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      id: ID
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author!
  }
`

// Resolvers uses data to retrieve the correct value for the query
// The returned object has to follow the schema structure
// Any field in the schema that's not been defaultly resolved, needs to be manually resolved
// Such as the fileds genres in Book and books in Author
// Mutations is defined in resolvers
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      // Authors Filter
      if (args.author) {
        return books.filter(book => book.author === args.author)
      } else if (args.genre) {
        return books.filter(book => {
          const bookGenre = book.genres.find(genre => genre === args.genre)
          return bookGenre === args.genre
        })
      } else {
        return [...books]
      }
    },
    allAuthors: () => [...authors]
  },
  Mutation: {
    addBook: (root, args) => {
      // Add books to system
      const book = {...args, id: uuid()}
      books = books.concat(book)

      // Add author to system
      const author = authors.find(author => author.name === args.author)
      if (!author) {
        authors = authors.concat({
          name: args.author,
          id: uuid(),
          born: null
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      authors = authors.map(author => {
        if (author.name === args.name) {
          author.born = args.setBornTo
          return author
        } else {
          return author
        }
      })

      return authors.find(author => author.name === args.name)
    }
  },
  Book: {
    genres: (root) => [...root.genres]
  },
  Author: {
    books: root => books.filter(book => book.author === root.name),
    bookCount: root => books.filter(book => book.author === root.name).length
  }
}

// Adding types and resolvers to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Initiate a listener to listen out for any queries
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
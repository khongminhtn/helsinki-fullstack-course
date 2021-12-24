const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://tuyen:fullstack@cluster0.esu2m.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// JWT
const JWT_SECRET = "UNDEFINED"

// Defining Schemas
// Structuring the data and queries
// Think of the schema as the blue print and resolver is the functionality
const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
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
    allAuthors: [Author!]!,
    me: User,
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
    ): Author!,
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

// Resolvers uses data to retrieve the correct value for the query
// The returned object has to follow the schema structure
// Any field in the schema that's not been defaultly resolved, needs to be manually resolved
// Such as the fileds genres in Book and books in Author
// Mutations is defined in resolvers
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // Authors Filter
      if (args.author) {
        // return await Book.find({ author: { $in: args.author }}).populate()
      } else if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] }}).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      // Add author to system if not found
      const authors = await Author.find({})
      let author = authors.find(author => author.name === args.author)
      if (!author) {
        author = {
          name: args.author,
          born: null
        }
        // Add Author to database
        const newAuthor = new Author({...author})
        try {
          const response = await newAuthor.save() 
          author = {
            name: args.author,
            born: null,
            id: response._id
          }
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      }

      // Add book to database
      const newBook = new Book({...args, author: author.id})
      newBook.save()
      return {...args, author}
    },
    editAuthor: async (root, args) => {
      if (JWT_SECRET === "UNDEFINED") {
        return null
      }

      const authors = await Author.find({})
      const newAuthors = authors.map(author => {
        if (author.name === args.name) {
          author.born = args.setBornTo
          return author
        } else {
          return author
        }
      })

      return authors.find(author => author.name === args.name)
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username, 
        favouriteGenre: args.favouriteGenre 
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Book: {
    genres: (root) => [...root.genres]
  },
  Author: {
    books: root => {
      // try {
      //   const response = async () => await Book.find({}).populate('author')
      //   return response.filter(book => book.author.name === root.name)
      // } catch({message}) {
      //   console.log(message)
      // }
      return ["Stuck"]
    },
    bookCount: async root => {
      // const response = Book.find({}).populate('author')
      // return response.filter(book => book.author.name === root.name).length
      return 2
    }
  }
}

// Adding types and resolvers to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Context is shared across all resolvers
    // For example this code will provide user authentication
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('favouriteGenre')
      return { currentUser }
    }
  }
})

// Initiate a listener to listen out for any queries
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
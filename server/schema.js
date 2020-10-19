const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authors: [Author]
    pages: Int
    yearPublished: Int
    ISBN: Int
  }

  type Author {
    id: ID!
    name: String!
    nationality: String
    yearBorn: Int!
    yearnDied: Int
    books: [Book]
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    postName: String!
    bookCollection: [Book]
  }

  type Query {
    authors: [Author]
    bookById(id: ID!): Book
    booksByAuthor(id: ID!): [Book]
    me: User
  }

  type Mutation {
    login(email: String): String #token
    createBook(input: CreateBook): BookAdded
    updateBook(input: CreateBook): Book
    createAuthor(input: CreateAuthor): AuthorAdded
    updateAuthor(input: CreateAuthor): Author
    createUser(input: CreateUser): User
  }

  input CreateBook {
    title: String!
    authorIds: [ID]
    pages: Int
    yearPublished: Int
    ISBN: Int
  }

  input CreateAuthor {
    name: String!
    nationality: String
    yearBorn: Int!
    yearnDied: Int
  }

  input CreateUser {
    email: String!
    firstName: String!
    lastName: String!
    postName: String!
  }

  type BookAdded {
    success: Boolean!
    book: Book
  }

  type AuthorAdded {
    success: Boolean!
    author: Author
  }
`;

module.exports = typeDefs;

// input CreateBookInput {
//     title: String!
//     pages: Int
//     yearPublished: Int
//     ISBN: Int
//   }

//   input CreateAuthorInput {
//     name: String!
//     nationality: String
//     yearBorn: Int!
//     yearnDied: Int
//   }

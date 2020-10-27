const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authors: [String]
    description: String
    pages: Int
    yearPublished: Int
    ISBN: String
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
    authorByName(name: String!): Author
    bookById(id: ID!): Book
    bookByTitle(title: String!): [Book]
    booksByAuthorName(authorName: String!): [Book]
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

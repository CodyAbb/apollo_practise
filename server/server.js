const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const BookAPI = require("./data/books");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ bookAPI: new BookAPI() }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

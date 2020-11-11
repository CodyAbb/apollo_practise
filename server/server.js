const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");
const { isEmail } = require("isemail");
const typeDefs = require("./schema");
const User = require("./models");
const BookAPI = require("./data/books");
const UserAPI = require("./data/user");
const resolvers = require("./resolvers");

const client = new MongoClient("mongodb://localhost:27017/apollotest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(() => console.log("Database connected"));

const server = new ApolloServer({
  //provides global context on each request made
  context: () => {
    return {
      userEmail: "test@test.com",
    };
  },

  //Async for when auth created to be added to context
  // async ({ req }) => {
  //   const auth = (req.headers && req.headers.authorization) || "";
  //   const email = Buffer.from(auth, "base64").toString("ascii");

  //   if (!isEmail.validate(email)) return { user: null };

  typeDefs,
  resolvers,
  dataSources: () => ({
    bookAPI: new BookAPI(),
    userAPI: new UserAPI(client.db().collection("users")),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

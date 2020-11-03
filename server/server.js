const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { isEmail } = require("isemail");
const typeDefs = require("./schema");
const User = require("./models");
const BookAPI = require("./data/books");
const UserAPI = require("./data/user");
const resolvers = require("./resolvers");

mongoose.connect("mongodb://localhost:27017/apollotest", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => console.log("Connected to Database"));

const server = new ApolloServer({
  //provides global context on each request made
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    if (!isEmail.validate(email)) return { user: null };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookAPI: new BookAPI(),
    userAPI: new UserAPI(User),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

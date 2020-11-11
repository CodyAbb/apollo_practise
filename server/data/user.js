const { MongoDataSource } = require("apollo-datasource-mongodb");
const { User } = require("../models");

class UserAPI extends MongoDataSource {
  //Allows access to current user that is making requests
  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email }) {
    const user = await this.collection.findOneById(userId);
    return user;
  }

  getBooksInUsersCollection() {}

  addBooksToUsersCollection({ bookIds }) {}

  removeBookFromUsersCollection({ bookId }) {}
}

module.exports = UserAPI;

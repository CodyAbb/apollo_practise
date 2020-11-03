const { MongoDataSource } = require("apollo-datasource-mongodb");

export default class UserAPI extends MongoDataSource {
  //Allows access to current user that is making requests
  initialize(config) {
    this.context = config.context;
  }

  getUser({ userId }) {
    return this.findOneById(userId);
  }

  async findOrCreateUser({ email }) {}

  getBooksInUsersCollection() {}

  addBooksToUsersCollection({ bookIds }) {}

  removeBookFromUsersCollection({ bookId }) {}
}

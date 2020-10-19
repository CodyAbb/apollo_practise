const { RESTDataSource } = require("apollo-datasource-rest");

class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "";
  }
}

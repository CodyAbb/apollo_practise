const { RESTDataSource } = require("apollo-datasource-rest");

class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.googleapis.com/books/v1/";
  }

  //uses google book specific id
  async getBookById({ id }) {
    const response = await this.get(`volumes/${id}`);
    return this.bookReducer(response);
  }

  async getBookByTitle({ searchTerm }) {
    //Change url from spaces to %20
    const removeSpacesTerm = searchTerm.replace(/ /g, "%20");

    const response = await this.get(`volumes?q=${searchTerm}`);
    // console.log(response.items[0]);
    return Array.isArray(response.items)
      ? response.items.map((book) => this.bookReducer(book))
      : [];
  }

  async getBooksByAuthor({ searchTerm }) {
    //Change url from spaces to %20
    const removeSpacesTerm = searchTerm.replace(/ /g, "%20");

    const respone = await this.get(`volumes?q=+inauthor:${removeSpacesTerm}`);
    return Array.isArray(response.items)
      ? respone.map((book) => this.bookReducer(book))
      : [];
  }

  bookReducer(book) {
    let publishedYear = parseInt(book.volumeInfo.publishedDate.slice(0, 4));
    let isbn;

    if (book.volumeInfo.industryIdentifiers) {
      for (let identityData of book.volumeInfo.industryIdentifiers) {
        console.log(identityData);
        if (identityData.type === "ISBN_13") {
          isbn = parseInt(identityData.identifier);
        } else isbn = undefined;
      }

      // isbn = parseInt(book.volumeInfo.industryIdentifiers[0].identifier);
    } else {
      isbn = undefined;
    }

    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      pages: book.volumeInfo.pageCount,
      yearPublished: publishedYear,
      ISBN: isbn,
    };
  }
}

module.exports = BookAPI;

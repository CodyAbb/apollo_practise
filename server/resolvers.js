module.exports = {
  Query: {
    bookById: (_, { id }, { dataSources }) =>
      dataSources.bookAPI.getBookById({ id: id }),
    bookByTitle: (_, { title }, { dataSources }) =>
      dataSources.bookAPI.getBookByTitle({ searchTerm: title }),
    booksByAuthorName: (_, { authorName }, { dataSources }) =>
      dataSources.bookAPI.getBooksByAuthor({ searchTerm: authorName }),
  },
};

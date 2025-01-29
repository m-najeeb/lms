const { BookSchema } = require("../models/bookModels");

class BookQueries {
  async createBook(data) {
    const book = new BookSchema(data);
    return await book.save();
  }
}

module.exports = new BookQueries();

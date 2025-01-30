const { BookSchema } = require("../models/bookModels");

class BookQueries {
  async createBook(data) {
    const book = new BookSchema(data);
    return await book.save();
  }

  async getBookDetails(data) {
    return await BookSchema.find({ isDeleted: false });
  }

  async getBookById(id) {
    return await BookSchema.findById({ id: id });
  }

  async getBookByTitle(title) {
    return await BookSchema.findOne({ title: title });
  }

  async getBookByAuthor(author) {
    return await BookSchema.findOne({ author: author });
  }

  async getBookByIsbn(isbn) {
    return await BookSchema.findOne({ isbn: isbn });
  }

  async getBookByCategory(category) {
    return await BookSchema.findOne({ category: category });
  }

  async getBookByPublishedYear(publishedYear) {
    return await BookSchema.findOne({ publishedYear: publishedYear });
  }

  async getBookByPrice(rentPrice) {
    return await BookSchema.findOne({ rentPrice: rentPrice });
  }

  async getBookDetailsById(id) {
    return await BookSchema.findOne({ _id: id });
  }

  async deleteBookDetailsById(id) {
    return await BookSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
  }
}

module.exports = new BookQueries();

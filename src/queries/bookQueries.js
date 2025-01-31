const { BookSchema, LoanSchema } = require("../models/bookModels");

class BookQueries {
  async createBook(data) {
    const book = new BookSchema(data);
    return await book.save();
  }

  async getBookDetails() {
    return await BookSchema.find();
  }

  async getBookById(id) {
    return await BookSchema.findById({ id });
  }

  async getBookByTitle(title) {
    return await BookSchema.find({ title });
  }

  async getBookByAuthor(author) {
    return await BookSchema.findOne({ author });
  }

  async getBookByIsbn(isbn) {
    return await BookSchema.findOne({ isbn });
  }

  async getBookByCategory(category) {
    return await BookSchema.findOne({ category });
  }

  async getBookByPublishedYear(publishedYear) {
    return await BookSchema.findOne({ publishedYear });
  }

  async getBookByPrice(rentPrice) {
    return await BookSchema.findOne({ rentPrice });
  }

  async getBookDetailsById(id) {
    return await BookSchema.findOne({ _id: id });
  }

  async deleteBookDetailsById(id) {
    return await BookSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
  }

  async updateBookStatusByTitle(title, userId) {
    const loanBook = LoanSchema.create({ title, userId });
    return await BookSchema.findOneAndUpdate(
      { title },
      { $set: { isOnLease: true, leaseAt: Date.now(), loan: [loanBook] } },
      { new: true }
    );
  }

  async getBookStatus(title) {
    return await BookSchema.findOne({
      title,
      isOnLease: true,
    });
  }

  async getBorrowedBook() {
    return await BookSchema.find({ isOnLease: true });
  }
}

module.exports = new BookQueries();

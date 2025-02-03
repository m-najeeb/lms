const { BookSchema } = require("../models/bookModels");

class BookQueries {
  async createBook(data) {
    const book = new BookSchema(data);
    return await book.save();
  }

  async getBookDetails() {
    return await BookSchema.find({ isDeleted: false });
  }

  async getBookByTitle(title) {
    return await BookSchema.find({ title, isDeleted: false });
  }

  async getBookByAuthor(author) {
    return await BookSchema.find({ author });
  }

  async getBookByIsbn(isbn) {
    return await BookSchema.findOne({ isbn });
  }

  async getBookByCategory(category) {
    return await BookSchema.find({ category });
  }

  async getBookByPublishedYear(publishedYear) {
    return await BookSchema.find({ publishedYear });
  }

  async getBookByPrice(rentPrice) {
    return await BookSchema.find({ rentPrice });
  }

  async getBookDetailsById(id) {
    return await BookSchema.find({ _id: id });
  }

  async deleteBookDetailsById(id) {
    return await BookSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
  }

  async updateBookStatusByTitle(title, userId, numberOfDays) {
    const loanBook = {
      userId,
      startDate: Date.now(),
      endDate: Date.now() + 3600 * 1000 * 24 * numberOfDays,
    };
    return await BookSchema.findOneAndUpdate(
      { title },
      { $set: { isOnLease: true, leaseAt: Date.now(), loan: [loanBook] } },
      { new: true }
    );
  }

  async getBookStatus(title) {
    await BookSchema.updateMany(
      {
        isOnLease: true,
        "loan.endDate": { $lt: new Date() },
      },
      {
        $set: { isOnLease: false },
      }
    );
    return await BookSchema.findOne({
      title,
      isOnLease: true,
    });
  }

  async getBorrowedBookWithUserDetails() {
    return await BookSchema.find({ isOnLease: true }).populate(
      "loan.userId",
      "fullName email phone role"
    );
  }
}

module.exports = new BookQueries();

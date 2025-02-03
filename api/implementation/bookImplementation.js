const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const BookQueries = require("../../src/queries/bookQueries");

class BookImplementation {
  async getBooks() {
    try {
      const response = await BookQueries.getBookDetails();
      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_FOUND
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async addBook(data) {
    try {
      //   const { title, author, isbn, category, publishYear, price } = data;

      const response = await BookQueries.createBook(data);
      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.SUCCESSFULLY_BOOK_ADDED
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async searchBook(data) {
    try {
      const title = data.title;
      const response = await BookQueries.getBookByTitle(title);
      if (!response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_NOT_FOUND
        );
      }
      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_FOUND
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async updateBook(data) {
    try {
      const id = data.id;
      const existingBook = await BookQueries.getBookDetailsById(id);

      if (!existingBook) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          [],
          messages.BOOK_NOT_FOUND
        );
      }

      if (data.title) existingBook.title = data.title;
      if (data.author) existingBook.author = data.author;
      if (data.isbn) existingBook.isbn = data.isbn;
      if (data.category) existingBook.category = data.category;
      if (data.publishedYear) existingBook.publishedYear = data.publishedYear;
      if (data.rentPrice) existingBook.rentPrice = data.rentPrice;

      const response = await existingBook.save();

      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_UPDATE
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async deleteBook(data) {
    try {
      const id = data.id;
      const response = await BookQueries.deleteBookDetailsById(id);

      if (!response) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          [],
          messages.BOOK_NOT_FOUND
        );
      } else {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_DELETED
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async borrowBook(data) {
    try {
      // const { title, userId, numberOfDays } = data;
      const title = data.title;
      const userId = data.userId;
      const numberOfDays = data.numberOfDays;
      const response = await BookQueries.getBookByTitle(title);
      if (!response) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          response,
          messages.BOOK_NOT_FOUND
        );
      }
      const isOnLeaseCheck = await BookQueries.getBookStatus(title);

      if (isOnLeaseCheck?.isOnLease) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          [],
          messages.BOOK_NOT_AVAILBLE_TO_BORROW
        );
      }
      const borrowedBook = await BookQueries.updateBookStatusByTitle(
        title,
        userId,
        numberOfDays
      );

      if (borrowedBook) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          borrowedBook,
          messages.BOOK_BORROWED
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async borrowedBookWithUserDetails() {
    try {
      const response = await BookQueries.getBorrowedBookWithUserDetails();
      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BOOK_FOUND
        );
      }
    } catch (error) {
      console.log(error);
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }
}
module.exports = new BookImplementation();

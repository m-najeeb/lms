const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const BookQueries = require("../../src/queries/bookQueries");

class BookImplementation {
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
}
module.exports = new BookImplementation();

const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const bookImplementation = require("../implementation/bookImplementation");

class BookControllers {
  async getBooks(req, res) {
    try {
      const data = req.body;
      const response = await bookImplementation.getBooks(data);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async addBook(req, res) {
    try {
      const data = req.body;
      //   const {error,value}= await bookValidation.addBook(data)
      //   if (error) {
      //     ResponseService.status = constants.CODE.BAD_REQUEST;
      //     return res
      //       .status(ResponseService.status)
      //       .send(
      //         ResponseService.responseService(
      //           constants.STATUS.ERROR,
      //           error.details[0].message,
      //           messages.INVALID_DATA
      //         )
      //       );
      //   }
      const response = await bookImplementation.addBook(data);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async searchBook(req, res) {
    try {
      const data = req.body;
      const response = await bookImplementation.searchBook(data);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async updateBook(req, res) {
    try {
      const data = req.body;
      const response = await bookImplementation.updateBook(data);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async deleteBook(req, res) {
    try {
      const data = req.body;
      const response = await bookImplementation.deleteBook(data);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }
}

module.exports = new BookControllers();

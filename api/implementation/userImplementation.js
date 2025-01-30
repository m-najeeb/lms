const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const UserQueries = require("../../src/queries/userQueries");
const bcrypt = require("bcrypt");

class UserImplementation {
  async signUp(data) {
    try {
      const { username, email, phone } = data;
      const errorMessages = [];

      const existingUser = await UserQueries.getUserDetailsByData(data);

      if (existingUser) {
        if (existingUser.username === username)
          errorMessages.push(messages.USERNAME_EXISTS);
        if (existingUser.email === email)
          errorMessages.push(messages.EMAIL_EXISTS);
        if (existingUser.phone === phone)
          errorMessages.push(messages.PHONE_EXISTS);
      }

      if (errorMessages.length > 0) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          [],
          errorMessages
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const response = await UserQueries.createUser(data);

      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.SUCCESSFULLY_SIGN_UP
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

  async editName(data) {
    try {
      const id = data.id;
      const existingUser = await UserQueries.getUserDetailsById(id);

      if (!existingUser) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return ResponseService.responseService(
          constants.STATUS.ERROR,
          [],
          messages.USER_NOT_FOUND
        );
      }

      if (data.fullName) existingUser.fullName = data.fullName;

      const response = await existingUser.save();

      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.BASIC_PROFILE_UPDATE
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

module.exports = new UserImplementation();

const Joi = require("joi");
const constants = require("../utilities/constants");

class userValidations {
  async signUp(userData) {
    const schema = Joi.object({
      fullName: Joi.string().max(55).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(constants.PASSWORD.REGEX)
        .required()
        .messages({
          "string.pattern.base": constants.PASSWORD.MESSAGE_FORMAT,
        }),
      role: Joi.number().valid(0, 1).required(),
    });
    return schema.validate(userData);
  }
}

module.exports = new userValidations();

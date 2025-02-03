const Joi = require("joi");

class bookValidations {
  async signUp(bookData) {
    const schema = Joi.object({
      title: Joi.string().max(55).required(),
      author: Joi.string().max(55).required(),
      isbn: Joi.string().max(55).required(),
      category: Joi.string().max(55).required(),
      publishedYear: Joi.number().required(),
      rentPrice: Joi.number().required(),
    });
    return schema.validate(bookData);
  }
}

module.exports = new bookValidations();

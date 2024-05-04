const Joi = require("joi");

const postUser = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.pattern.base": "Invalid name format",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email address is required",
  }),
});

module.exports = {
  postUser,
};

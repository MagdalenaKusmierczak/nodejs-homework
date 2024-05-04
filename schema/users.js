const Joi = require("joi");

const postUser = Joi.object({
  password: Joi.string().required().messages({
    "string.pattern.base": "Invalid name format",
    "any.required": "Password is required",
  }),
  email: Joi.string().email().required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email address is required",
  }),
});

module.exports = {
  postUser,
};

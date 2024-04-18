const Joi = require("joi");

const postContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.pattern.base": "Invalid name format",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email address is required",
  }),
  phone: Joi.string().min(5).max(16).required().messages({
    "string.pattern.base": "Invalid phone number format",
    "any.required": "Phone number is required",
  }),
});

const putContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).messages({
    "string.pattern.base": "Invalid name format",
  }),
  email: Joi.string().email().messages({
    "string.pattern.base": "Invalid email format",
  }),
  phone: Joi.string().min(5).max(16).messages({
    "string.pattern.base": "Invalid phone number format",
  }),
});
module.exports = {
    postContact,
    putContact
};        
'use strict';

const Joi = require('joi');

module.exports = {
  body: {
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().min(3).max(40).required(),
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().regex(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/).required()
  }
};

import Joi from 'joi';
// const Joi = require('joi');

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

const logginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional(),
});

const usernameValidation = Joi.string().max(100).required();

export default {
  registerUserValidation, logginUserValidation, updateUserValidation, usernameValidation,
};
// export default registerUserValidation;

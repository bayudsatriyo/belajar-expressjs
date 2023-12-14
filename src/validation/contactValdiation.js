import Joi from 'joi';

const addContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(100).required(),
  phone: Joi.string().max(100).required(),
});

const getContactIdValidation = Joi.number().max(20).required();

export default { addContactValidation, getContactIdValidation };

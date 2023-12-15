import Joi from 'joi';

const addContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(100).required(),
  phone: Joi.string().max(100).required(),
});

const getContactIdValidation = Joi.number().max(20).required();

const updateContactValdation = Joi.object({
  id: Joi.number().positive().required(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
  phone: Joi.string().max(100).optional(),
});

const searchContactValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  page: Joi.number().min(1).positive().optional()
    .default(1),
  size: Joi.number().min(1).positive().max(100)
    .optional()
    .default(10),
});

export default {
  addContactValidation, getContactIdValidation, updateContactValdation, searchContactValidation,
};

import Joi from 'joi';

const bodyAddressValidation = Joi.object({
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).required(),
});

const idAddressValidation = Joi.number().positive().min(1).required();

const bodyAddressUpdateValidation = Joi.object({
  id: Joi.number().required(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).required(),
});

export default { bodyAddressValidation, idAddressValidation, bodyAddressUpdateValidation };

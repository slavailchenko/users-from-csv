const Joi = require('@hapi/joi');

const schema = Joi.array().items(
  Joi.object().keys({
    user_name: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    age: Joi.number().integer().min(1),
  })
);

module.exports = schema;
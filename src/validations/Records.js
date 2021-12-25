const Joi = require('joi');
// joi library is used for validations

// YYYY-MM-DD
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[1-9]|2[1-9]|3[0-1])$/;
const dateErrorMessage = {
  'string.pattern.base': `Date format should be YYYY-MM-DD`,
};

const getTotalCountsValidation = Joi.object({
  startDate: Joi.string()
    .regex(datePattern)
    .required()
    .messages(dateErrorMessage),
  endDate: Joi.string()
    .regex(datePattern)
    .required()
    .messages(dateErrorMessage),
  minCount: Joi.number().positive().integer().required(),
  maxCount: Joi.number().positive().integer().required(),
});

module.exports = getTotalCountsValidation;

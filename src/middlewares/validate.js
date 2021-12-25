const httpStatus = require('http-status');

const ApiError = require('../errors/ApiError');

const validate = (body) => (req, res, next) => {
  // destructure the returned object from Joi.validate()
  const { value, error } = body.validate(req.body);
  if (error) {
    // get error message from the objec and clean the message, remove double quotes
    const errorMessage = error.details[0].message.replace(/\"/g, '');
    // pass error to error handling middleware
    return next(
      new ApiError(
        {
          code: 4,
          msg: 'ValidationError: ' + errorMessage,
        },
        httpStatus.BAD_REQUEST
      )
    );
  }

  // if error does not exists, move to next middleware
  Object.assign(req, value);
  return next();
};

module.exports = validate;

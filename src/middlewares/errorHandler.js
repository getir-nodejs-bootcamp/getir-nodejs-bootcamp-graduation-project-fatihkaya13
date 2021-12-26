const logger = require('../logger');

module.exports = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error....';
  logger.log({
    level: 'error',
    message: {
      status: status,
      message: message,
    },
  });

  // if not an error code is specified, the default is set to 500
  res.status(status);
  res.json({
    message,
  });
};

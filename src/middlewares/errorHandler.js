module.exports = (error, req, res, next) => {
  // if not an error code is specified, the default is set to 500
  res.status(error.status || 500);
  res.json({
    error: error.message || 'Internal Server Error....',
  });
};

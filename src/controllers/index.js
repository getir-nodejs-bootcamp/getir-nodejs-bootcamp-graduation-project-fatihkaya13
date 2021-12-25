const { listTotalCounts } = require('../services');

const httpStatus = require('http-status');

const getTotalCounts = async (req, res, next) => {
  try {
    const response = await listTotalCounts();
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = { getTotalCounts };

const { listTotalCounts } = require('../services');

const httpStatus = require('http-status');

const getTotalCounts = (req, res, next) => {
  listTotalCounts()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

module.exports = { getTotalCounts };

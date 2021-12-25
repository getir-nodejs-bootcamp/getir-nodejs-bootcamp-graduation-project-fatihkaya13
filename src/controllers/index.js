const { listTotalCounts } = require('../services');

const httpStatus = require('http-status');

const getTotalCounts = async (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  try {
    const response = await listTotalCounts(
      startDate,
      endDate,
      minCount,
      maxCount
    );
    res
      .status(httpStatus.OK)
      .send({ code: 0, msg: 'Success', records: response });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = { getTotalCounts };

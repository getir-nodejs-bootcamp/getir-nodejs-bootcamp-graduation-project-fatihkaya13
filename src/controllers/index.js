const { listTotalCounts } = require('../services');

const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

const getTotalCounts = async (req, res, next) => {
  // destructure request body
  const { startDate, endDate, minCount, maxCount } = req.body;
  
  try {
    const response = await listTotalCounts(
      startDate,
      endDate,
      minCount,
      maxCount
    );

    if (!response)
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ code: 1, msg: 'Not Found' });

    res
      .status(httpStatus.OK)
      .send({ code: 0, msg: 'Success', records: response });
  } catch (err) {
    next(
      new ApiError({
        code: 3,
        msg: 'Controllers.getTotalCounts: ' + err.message,
      })
    );
  }
};

module.exports = { getTotalCounts };

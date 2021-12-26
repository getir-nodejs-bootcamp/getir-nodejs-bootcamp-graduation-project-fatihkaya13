const Record = require('../models/Records');
const ApiError = require('../errors/ApiError');

/**
 * @param {date} startDate begin date for createdAt field
 * @param {date} endDate finish date for createdAt field
 * @param {number} minCount minimumum sum of counts for counts array field
 * @param {number} maxCount maximum sum of counts for counts array field
 * @returns Returns an object with either DB response or 'error'
 */
const listTotalCounts = async (startDate, endDate, minCount, maxCount) => {
  // the pipeline is composed of two match stages and one project stage
  // it is unnecessary to calculate the sum of counts arrays for each document
  // first filter with given date criteria for better performance
  // then calculate the sum of counts for each array
  // finally filter with given min-max count criteria
  const pipeline = [
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: {
          $reduce: {
            input: '$counts',
            initialValue: 0,
            in: { $add: ['$$value', '$$this'] },
          },
        },
      },
    },
    {
      $match: {
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    },
  ];

  try {
    return await Record.aggregate(pipeline);
  } catch (err) {
    return new ApiError({
      code: 3,
      msg: 'Services.listTotalCounts: ' + err.message,
    });
  }
};

module.exports = { listTotalCounts };

const Record = require('../models/Records');

const listTotalCounts = async (startDate, endDate, minCount, maxCount) => {
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

  return await Record.aggregate(pipeline);
};

module.exports = { listTotalCounts };

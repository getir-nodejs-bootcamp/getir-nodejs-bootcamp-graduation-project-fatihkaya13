const Record = require('../models/Records');

const listTotalCounts = async () => {
  const pipeline = [
    {
      $match: {
        createdAt: {
          $gte: new Date('2016-01-26'), // startDate
          $lte: new Date('2018-02-02'), // endDate
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
          $gte: 2800, // minCount
          $lte: 2900, // maxCount
        },
      },
    },
  ];

  return await Record.aggregate(pipeline);
};

module.exports = { listTotalCounts };

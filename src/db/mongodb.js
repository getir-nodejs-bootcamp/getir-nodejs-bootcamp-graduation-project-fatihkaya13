const Mongoose = require('mongoose');
const logger = require('../logger');

const db = Mongoose.connection;

db.on('connecting', () => {
  logger.log({
    level: 'info',
    message: 'trying to establish MongoDB connection',
  });
});

db.once('open', () => {
  logger.log({
    level: 'info',
    message: 'connected to MongoDB',
  });
});

db.on('disconnecting', () => {
  logger.log({
    level: 'info',
    message: 'disconnecting from MongoDB',
  });
});

db.on('disconnected', () => {
  logger.log({
    level: 'info',
    message: 'disconnected from MongoDB',
  });
});

db.on('error', (err) => {
  logger.log({
    level: 'error',
    message: err.message,
  });
});

const connectDB = async () => {
  try {
    await Mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    logger.log({
      level: 'error',
      message: err,
    });
  }
};

// disconnection is used for test scripts as after all hook
const disconnectDB = async () => {
  await Mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };

const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'express-app-service' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../', 'logs', 'error.log'),
      level: 'error',
    }),
  ],
});

logger.add(new winston.transports.Console({}));

module.exports = logger;

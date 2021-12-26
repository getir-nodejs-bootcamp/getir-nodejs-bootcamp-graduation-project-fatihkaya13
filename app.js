const express = require('express');
const helmet = require('helmet');
const config = require('./src/config');
const { connectDB } = require('./src/db/mongodb');
const ApiError = require('./src/errors/ApiError');
const errorHandler = require('./src/middlewares/errorHandler');
const httpStatus = require('http-status');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const logger = require('./src/logger');
const { RecordsRoutes } = require('./src/routes');

const PORT = process.env.EXPRESS_APP_PORT || 8080;

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './src/logs', 'network-access.log'),
  { flags: 'a' }
);

// load config
config();
// connect to mongodb
connectDB();
// create an instance of express
const app = express();

// use express.json for body parser
app.use(express.json());
// use helmet for security reasons
app.use(helmet());
// enable cors for all requests for browser engines
app.use(cors());
// setup the morgan logger for any request log
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/records', RecordsRoutes);
// any route that does not match with /records will be handled by below middleware
// the error created here will be passed to next error handler middleware
app.use((req, res, next) => {
  const error = new ApiError(
    {
      code: 5,
      msg: 'EndpointError: Endpoint is not found',
    },
    httpStatus.NOT_FOUND
  );
  next(error);
});

// for any error, use the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Server is running on port ${PORT}... press cntrl-c to exit`,
  });
});

module.exports = app;

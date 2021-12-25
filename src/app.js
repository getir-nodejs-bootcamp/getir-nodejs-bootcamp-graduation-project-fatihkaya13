const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const { connectDB } = require('./db/mongodb');
const ApiError = require('./errors/ApiError');
const errorHandler = require('./middlewares/errorHandler');
const httpStatus = require('http-status');

const { RecordsRoutes } = require('./routes');

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

app.listen(process.env.EXPRESS_APP_PORT, () => {
  console.log(
    `Server is running on port ${process.env.EXPRESS_APP_PORT}... press cntrl-c to exit`
  );
});

module.exports = app;

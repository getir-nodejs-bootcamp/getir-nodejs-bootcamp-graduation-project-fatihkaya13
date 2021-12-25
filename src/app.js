const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const connectDB = require('./db/mongodb');

const { RecordsRoutes } = require('./routes');

config();
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/records', RecordsRoutes);

app.listen(process.env.EXPRESS_APP_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_APP_PORT}`);
});

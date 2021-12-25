const Mongoose = require('mongoose');

const RecordSchema = new Mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: [Number],
});

const Record = Mongoose.model('record', RecordSchema);

module.exports = Record;

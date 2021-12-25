const Mongoose = require('mongoose');

const RecordSchema = new Mongoose.Schema({
  // field definitions are not necessary here
  // key: String,
  // createdAt: Date,
  // counts: [Number],
});

const Record = Mongoose.model('record', RecordSchema);

module.exports = Record;

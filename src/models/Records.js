const Mongoose = require('mongoose');

// fields for schema is not necessary for this project
const RecordSchema = new Mongoose.Schema({});

const Record = Mongoose.model('record', RecordSchema);

module.exports = Record;

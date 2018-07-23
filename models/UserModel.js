const mongoose = require('mongoose');

const TimelogSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
});
mongoose.model('Timelog', TimelogSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  logs: [TimelogSchema],
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

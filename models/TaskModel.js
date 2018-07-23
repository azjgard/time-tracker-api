const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  description: String,
  completed: Boolean,
});
mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');

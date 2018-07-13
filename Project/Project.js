const mongoose = require('mongoose');
const TaskSchema = require('../Task/Task');
const ProjectSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  tasks: [TaskSchema],
});
mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');

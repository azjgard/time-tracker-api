const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  dueDate: Date,
  description: String,
  completed: Boolean,
});

const ProjectSchema = new Schema({
  name: String,
  dueDate: Date,
  description: String,
  tasks: [TaskSchema],
});

const ClientSchema = new Schema({
  name: String,
  contactName: String,
  contactEmail: String,
  projects: [ProjectSchema],
  userId: mongoose.Schema.Types.ObjectId, // foreign key to User
});

mongoose.model('Client', ClientSchema);

module.exports = mongoose.model('Client');

const Sequelize = require("sequelize");
const db = require("./db");

const Project = require("./Project");

const Task = db.dbRef().define("task", {
  TaskID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: Sequelize.STRING
  },
  ProjectID: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: "ProjectID"
    }
  }
});

module.exports = Task;

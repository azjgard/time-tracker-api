const Sequelize = require("sequelize");
const db = require("./db");

const User = require("./User");
const Task = require("./Task");

const Timelog = db.dbRef().define("timelog", {
  TimelogID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clockIn: {
    type: Sequelize.DATE
  },
  clockOut: {
    type: Sequelize.DATE
  },
  UserID: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "UserID"
    }
  },
  TaskID: {
    type: Sequelize.INTEGER,
    references: {
      model: Task,
      key: "TaskID"
    }
  }
});

module.exports = Timelog;

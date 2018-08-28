const Sequelize = require("sequelize");
const db = require("./db");

const Account = require("./Account");

const Project = db.dbRef().define("project", {
  ProjectID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: Sequelize.STRING
  },
  Description: {
    type: Sequelize.STRING
  },
  AccountID: {
    type: Sequelize.INTEGER,
    references: {
      model: Account,
      key: "AccountID"
    }
  }
});

module.exports = Project;

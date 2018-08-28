const Sequelize = require("sequelize");
const db = require("./db");

const Account = require("./Account");

const User = db.dbRef().define("user", {
  UserID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: Sequelize.STRING
  },
  Email: {
    type: Sequelize.STRING,
    unique: true
  },
  AccountID: {
    type: Sequelize.INTEGER,
    references: {
      model: Account,
      key: "AccountID"
    }
  }
});

module.exports = User;

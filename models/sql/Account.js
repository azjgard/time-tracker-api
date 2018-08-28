const Sequelize = require("sequelize");
const db = require("./db");

const Account = db.dbRef().define("account", {
  AccountID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AccountType: {
    type: Sequelize.ENUM("standard, premium"),
    defaultValue: "standard"
  }
});

module.exports = Account;

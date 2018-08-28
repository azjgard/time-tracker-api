module.exports = function({ dbName, dbUsername, dbPassword, misc }) {
  require("./db").init(dbName, dbUsername, dbPassword, misc);

  // Models
  const Account = require("./Account");
  const Project = require("./Project");
  const Task = require("./Task");
  const Timelog = require("./Timelog");
  const User = require("./User");

  return {
    Account,
    Project,
    Task,
    Timelog,
    User
  };
};

// console.log(module.exports());
module.exports({
  dbName: "test1",
  dbUsername: "root",
  dbPassword: "password",
  misc: {}
});

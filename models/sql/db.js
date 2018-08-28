const Sequelize = require("sequelize");

const global = {
  sequelize: null
};

module.exports = {
  init({ dbName, dbUsername, dbPassword, misc }) {
    if (!global.sequelize)
      global.sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
        // sensible defaults that can be overriden
        dialect: "mysql",
        operatorsAliases: false,
        ...misc
      });
  },
  dbRef() {
    return (
      global.sequelize || {
        define() {
          console.error(
            "You can't call dbRef() until you've initialized the database with init()"
          );
        }
      }
    );
  }
};

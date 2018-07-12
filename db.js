var mongoose = require('mongoose');

const connectToDb = (host, port, dbName) => {
  mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
};

connectToDb('localhost', 27017, 'testdb');

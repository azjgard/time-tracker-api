const User = require('./User');

const getUserById = _id => User.findOne({_id}, {password: 0});

const getUserByEmail = email => User.findOne({email}, {password: 0});

const getUserByEmailOrName = (email, name) =>
  User.findOne({$or: [{email}, {name}]});

module.exports = {getUserById, getUserByEmail, getUserByEmailOrName};

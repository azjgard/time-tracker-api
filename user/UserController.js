const User = require('./User');

/**
 * Gets a user by the provided ID
 *
 * @returns {object} User (Promise)
 */
const getUserById = _id => User.findOne({_id}, {password: 0});

/**
 * Gets a user by the provided email
 *
 * @returns {object} User (Promise)
 */
const getUserByEmail = email => User.findOne({email}, {password: 0});

/**
 * Gets a user that matches either the provided email or the provided name
 *
 * @returns {object} User (Promise)
 */
const getUserByEmailOrName = (email, name) =>
  User.findOne({$or: [{email}, {name}]});

/**
 * Creates a new user
 *
 * @returns {object} User (Promise)
 */
const createUser = (name, email, password) =>
  User.create({
    name,
    email,
    password,
  });

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByEmailOrName,
  createUser,
};

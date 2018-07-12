const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const key = process.env.JWT_KEY;

/**
 * Generates a JWT from 'data' that expires in 'expiresInHours' hours
 *
 * @returns {string} A signed JWT
 */
const generateJWT = (data, expiresInHours) =>
  jwt.sign(data, key, {
    expiresIn: expiresInHours * 3600,
  });

/**
 * Parses JWT from request object
 *
 * @returns {string} JWT
 */
const getJWT = req => req.headers['x-access-token'];

const verifyJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

/**
 * Generates a salt that can be used to encrypt a password
 *
 * @returns {string} Salt
 */
const genSalt = num =>
  new Promise(resolve => bcrypt.genSalt(num, (err, salt) => resolve(salt)));

/**
 * Hashes a password
 *
 * @returns {string} Hashed password
 */
const hash = (password, salt) =>
  new Promise(resolve =>
    bcrypt.hash(password, salt, (err, hash) => resolve(hash)),
  );

/**
 * Generates a salt and hashes a password
 *
 * @returns {string} hashed password
 */
const hashPassword = password =>
  new Promise(async resolve => {
    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);
    resolve(hashedPassword);
  });

/**
 * Compares plain text password with hashed password to determine if they match
 *
 * @returns {boolean} Promise that resolves to true or false (true if
 * passwords match)
 */
const comparePasswords = (plainTextPassword, hashedPassword) =>
  new Promise(async resolve =>
    bcrypt.compare(plainTextPassword, hashedPassword, (err, res) =>
      resolve(res),
    ),
  );

module.exports.jwt = {generateJWT, getJWT, verifyJWT};
module.exports.hash = {hashPassword, comparePasswords};

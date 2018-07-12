const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const key = process.env.JWT_KEY;

const generateToken = (data, expiresInHours) =>
  jwt.sign(data, key, {
    expiresIn: expiresInHours * 3600,
  });

const getJWT = req => req.headers['x-access-token'];

const verifyJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

module.exports.jwt = {generateToken, getJWT, verifyJWT};

const genSalt = num =>
  new Promise(resolve => bcrypt.genSalt(num, (err, salt) => resolve(salt)));

const hash = (password, salt) =>
  new Promise(resolve =>
    bcrypt.hash(password, salt, (err, hash) => resolve(hash)),
  );

const hashPassword = password =>
  new Promise(async resolve => {
    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);
    resolve(hashedPassword);
  });

module.exports.hash = {hashPassword};

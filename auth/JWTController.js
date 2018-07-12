const jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY;

function generateToken(data, expiresInHours) {
  return jwt.sign(data, key, {
    expiresIn: expiresInHours * 3600,
  });
}

function getJWT(req) {
  return req.headers['x-access-token'];
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

module.exports = {generateToken, getJWT, verifyJWT};

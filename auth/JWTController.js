const jwt = require('jsonwebtoken');

function generateToken(data, expiresInHours) {
  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: expiresInHours * 3600,
  });
}

module.exports = {generateToken};

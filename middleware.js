const {getJWT, verifyJWT} = require('./auth/AuthController').jwt;
const {getUserById} = require('./user/UserController');

const jwtProtected = async (req, res, next) => {
  const jwt = getJWT(req);

  if (!jwt) unauthorized(res);

  const {id} = await verifyJWT(jwt).catch(() => unauthorized(res));
  const user = await getUserById(id);

  req.user = user;

  next();
};

const errorCodes = (req, res, next) => {
  res._sendError = message => res.status(500).send({message});
  next();
};

function unauthorized(res) {
  res.status(500).send({message: 'Unauthorized.'});
}

module.exports = {errorCodes, jwtProtected};

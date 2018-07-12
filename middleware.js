const {getJWT, verifyJWT} = require('./auth/JWTController');
const User = require('./user/User');

const {getUserById} = require('./user/UserController');

const jwtProtected = async (req, res, next) => {
  const jwt = getJWT(req);

  if (!jwt) unauthorized(res);

  const {id} = await verifyJWT(jwt).catch(() => unauthorized(res));
  const user = await getUserById(id);

  req.user = user;

  next();
};

function unauthorized(res) {
  res.status(500).send({message: 'Unauthorized.'});
}

module.exports = {jwtProtected};

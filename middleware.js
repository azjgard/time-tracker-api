const {getJWT, verifyJWT} = require('./auth/JWTController');
const User = require('./user/User');

const jwtProtected = async (req, res, next) => {
  const jwt = getJWT(req);

  if (!jwt) unauthorized(res);

  const {id: _id} = await verifyJWT(jwt).catch(() => unauthorized(res));
  const user = await User.findOne({_id}, {password: 0});

  req.user = user;

  next();
};

function unauthorized(res) {
  res.status(500).send({message: 'Unauthorized.'});
}

module.exports = {jwtProtected};

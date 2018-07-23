const {getJWT, verifyJWT} = require('./controllers/AuthController').jwt;
const {getUserById} = require('./controllers/UserController');

const unauthorized = res => res.status(500).send({message: 'Unauthorized.'});

/**
 * When used as middleware on a route, will disallow the route from running if
 * the user is not authorized. If the user is authorized, will inject the user
 * object into the request object.
 *
 */
const jwtProtected = async (req, res, next) => {
  const jwt = getJWT(req);

  if (!jwt) unauthorized(res);

  const {id} = await verifyJWT(jwt).catch(() => unauthorized(res));
  const user = await getUserById(id);

  req.user = user;

  next();
};

/**
 * When used as middleware on a route, injects a function into the response
 * object that can be used to send generic error messages to the client.
 *
 */
const errorCodes = (req, res, next) => {
  res._sendError = message => res.status(500).send({message});
  next();
};

/**
 * When called as middleware, verifies that the strings in requiredKeys
 * array are present as keys on the req.body
 *
 * @returns {function}
 */
const requireKeys = requiredKeys => {
  return (req, res, next) => {
    const requestKeys = Object.keys(req.body);
    const missingKeys = [];

    requiredKeys.map(key => {
      if (!requestKeys.includes(key)) {
        missingKeys.push(key);
      }
    });

    if (missingKeys.length > 0) {
      res.status(500).send(`Missing keys: ${missingKeys.join(', ')}`);
    } else {
      next();
    }
  };
};

module.exports = {errorCodes, jwtProtected, requireKeys};

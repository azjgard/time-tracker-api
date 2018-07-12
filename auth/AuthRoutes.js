const router = require('../router');
const AuthController = require('./AuthController');

const {getUserByEmailOrName, createUser} = require('../user/UserController');

// Client sends username/email and password in request body. If a user
// doesn't already exist with those credentials, then a new user is created
// in the database with a hash of the password, and a JWT is generated and
// sent to the client.
router.post('/register', async (req, res) => {
  const {name, email, password: rawPassword} = req.body;
  const password = await AuthController.hash.hashPassword(rawPassword);

  const userExists = await getUserByEmailOrName(email, name).catch(
    res._sendError,
  );

  if (!userExists) {
    const newUser = await createUser(name, email, password).catch(
      res._sendError,
    );
    const token = AuthController.jwt.generateJWT({id: newUser._id}, 24);
    res.status(200).send({auth: true, token});
  } else {
    res._sendError('User already exists');
  }
});

// Client sends username/email and password in request body. If a user
// with those credentials exists and the raw password sent in the
// request body matches the hashed password stored in the database,
// then a JWT is generated and sent in a response to the client.
router.post('/login', async (req, res) => {
  const {email, name, password: requestPassword} = req.body;
  const user = await getUserByEmailOrName(email, name).catch(res._sendError);

  if (user) {
    const passwordCorrect = await AuthController.hash.comparePasswords(
      requestPassword,
      user.password,
    );

    if (passwordCorrect) {
      const token = AuthController.jwt.generateJWT({id: user._id}, 24);
      res.status(200).send({auth: true, token});
    } else {
      res._sendError('Incorrect username or password.');
    }
  } else {
    res._sendError('No user exists with those credentials.');
  }
});

module.exports = router;

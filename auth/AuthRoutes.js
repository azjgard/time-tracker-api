const router = require('../router');
const AuthController = require('./AuthController');

const {getUserByEmailOrName, createUser} = require('../user/UserController');

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
    const token = AuthController.jwt.generateToken({id: newUser._id}, 24);
    res.status(200).send({auth: true, token});
  } else {
    res._sendError('User already exists');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../user/User');
const {generateToken} = require('./JWTController');
const {hashPassword} = require('./AuthUtilities');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
  const {name, email, password: rawPassword} = req.body;
  const password = hashPassword(rawPassword);

  const sendError = error =>
    res
      .status(500)
      .send({message: 'There was a problem registering the user', error});

  const userExists = await User.findOne({
    $or: [{email}, {name}],
  }).catch(sendError);

  if (userExists) {
    sendError('User already exists');
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
    }).catch(sendError);

    const token = generateToken({id: newUser._id}, 24);

    res.status(200).send({auth: true, token});
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var User = require('./User');

const {getJWT, verifyJWT} = require('../auth/JWTController');
const {jwtProtected} = require('../middleware');

// CREATES A NEW USER
router.post('/', function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    },
  );
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      return res.status(500).send('There was a problem finding the users.');
    res.status(200).send(users);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send('User: ' + user.name + ' was deleted.');
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(
    err,
    user,
  ) {
    if (err)
      return res.status(500).send('There was a problem updating the user.');
    res.status(200).send(user);
  });
});

// The user can get information about themselves if they're logged
// in and the client has stored a JWT
router.get('/me', jwtProtected, async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;

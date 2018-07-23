const User = require('../models/UserModel');
const router = require('../router');
const {jwtProtected: authProtected} = require('../middleware');

// The user can get information about themselves if they're logged
// in and the client has stored a JWT
router.get('/me', authProtected, async (req, res) => {
  res.status(200).send(req.user);
});

// Log a new timelog under the user model
router.post('/timelog', authProtected, async (req, res) => {
  const {clockInTime, clockOutTime} = req.body;

  const user = await User.findById(req.user.id);
  user.logs.push({startTime: clockInTime, endTime: clockOutTime});
  await user.save();

  // create a new timelog under the
  // user model

  res.status(200).send({startTime: clockInTime, endTime: clockOutTime});
});

module.exports = router;

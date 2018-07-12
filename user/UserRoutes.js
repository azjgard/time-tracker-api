const router = require('../router');
const {jwtProtected: authProtected} = require('../middleware');

// The user can get information about themselves if they're logged
// in and the client has stored a JWT
router.get('/me', authProtected, async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;

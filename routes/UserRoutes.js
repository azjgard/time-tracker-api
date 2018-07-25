const User = require("../models/UserModel");
const router = require("../router");
const { jwtProtected: authProtected } = require("../middleware");

// The user can get information about themselves if they're logged
// in and the client has stored a JWT
router.get("/me", authProtected, async (req, res) => {
  res.status(200).send(req.user);
});

router.post("/timelog", authProtected, async (req, res) => {
  const { clockInTime, clockOutTime } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.logs.push({ startTime: clockInTime, endTime: clockOutTime });
    await user.save();

    res.status(200).send({
      message: "Time successfully logged",
      timelog: { startTime: clockInTime, endTime: clockOutTime }
    });
  } else {
    res.status(401).send({ message: "User doesnt exist" });
  }
});

router.get("/timelog", authProtected, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).send({ logs: user.logs });
  } else {
    res.status(401).send({ message: "User doesnt exist" });
  }
});

module.exports = router;

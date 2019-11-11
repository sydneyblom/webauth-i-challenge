const bcrypt = require('bcryptjs');
const router = require('express').Router();

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
  // read a password from the body
  const password = req.body.password;

  // hash the password using bcryptjs
  const hash = bcrypt.hashSync(password, 12);

  res.status(200).json({ password, hash });
});



module.exports = router;

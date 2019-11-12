const bcrypt = require('bcryptjs'); // npm i bcryptjs

const router = require('express').Router();

const Users = require('../users/users-model');



router.post('/register', (req, res) => {
  let userInformation = req.body;

  bcrypt.hash(userInformation.password, 12, (err, hashedPassword) => {
    userInformation.password = hashedPassword;

    Users.add(userInformation)
      .then(saved => {
        req.session.username = saved.username;
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      // check that the password is valid
      if (user && bcrypt.compareSync(password, user.password)) {
          req.session.username = user.username; //creates the cookie and sends it back to client//clients holds onto that cookie
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log('login error', error);
      res.status(500).json(error);
    });
});


router.get('/logout', (req,res) => {
    if(req.session) {
        req.session.destroy(err =>{
            if (err) {
              res.status(500).json({message: 'Error logging out'})
            } else {
                res.status(20).end();
            }
        })
    } else {
        res.status(200).json({message: "You are logged out"})
    }
})
module.exports = router;

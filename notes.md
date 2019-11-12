npm i express-session

const session = require ('express-session');


const sessionConfig={
    name: 'monkey',
    secret: 'keep it safe',
    cookies: {
        maxAge: 1000 * 30,
        secure: false, //should be true in proudction
        httpOnly: true, // should always be true
    }
resave: false, 
saveUninitialized: false, //GDPR compliant when a user excepts cookies
};

//auth -router

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that the password is valid
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; 
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
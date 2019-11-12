const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require ('express-session');
const KnexSessionStorage = require("connect-session-knex")(session); 

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knexConnection = require ('../database/dbConfig');

const server = express();

const sessionConfig = {
        name: 'monkey',
        secret: 'keep it safe',
        cookie: {
            maxAge: 1000 * 60 * 60, //lasts for 30 seconds then will expire 
            secure:true, //should be true in proudction
            httpOnly: true, // should always be true
        },
    resave: false, //if it has changed don't recreated it
    saveUninitialized: true, //GDPR compliant when a user excepts cookies
    store: new KnexSessionStorage ({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 10, //deletes expired sessions every 10 min
        tablename: "user_Sessions",
        sidfieldName: "id",
        createTable: true, 
    })
    };


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up', session: req.session });
});


    


module.exports = server;

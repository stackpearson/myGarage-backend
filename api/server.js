const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('../api/errorHandler.js')
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const server = express();

const sessionConfig = {
    name: 'spcookie',
    secret: 'shh, this is a secret string',
    cookie: {
        maxAge: 60*60*1000, //1 hour
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUnitialized: false, //required for GDPR

    store: new knexSessionStore({
        knex: require('../database/db-config.js'),
        tablename: 'sessions',
        sidfieldname: 'sessionId',
        createtable: true,
        clearInterval: 60*60*1000
    })
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/', authRouter);

server.get('/', (req, res) => {
    res.json({ message: 'api is up and running'});
})


server.use(errorHandler);
module.exports = server;
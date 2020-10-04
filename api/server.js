const express = require('express');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const errorHandler = require('../utils/error-handler.js');

const server = express();
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);



server.get('/', (req, res) => {
    res.json({api: "running"})
})

server.use(errorHandler);
module.exports = server;
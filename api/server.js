const express = require('express');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const vehiclesRouter = require('../vehicles/vehicles-router.js');
const servicesRouter = require('../services/services-router.js');
const errorHandler = require('../utils/error-handler.js');

const server = express();
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/vehicles', vehiclesRouter);
server.use('/api/services', servicesRouter);



server.get('/', (req, res) => {
    res.json({api: "running"})
})

server.use(errorHandler);
module.exports = server;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../utils/restricted-endpoint.js');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err))
})




module.exports = router;
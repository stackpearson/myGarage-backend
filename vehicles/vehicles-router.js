const router = require('express').Router();
const Vehicles = require('./vehicles-model.js');
const restricted = require('../utils/restricted-endpoint.js');

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Vehicles.find(id)
        .then(vehicles => {
            res.status(200).json(vehicles)
        })
        .catch(err => res.send(err))
})


module.exports = router;
const router = require('express').Router();
const Services = require('./services-model.js');
const restricted = require('../utils/restricted-endpoint.js');


//returns a list of services for the user specified in the params. Vehicle ID is supplied so they can be mapped through on the front end to match the appropriate vehicle
router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Services.findServices(id)
        .then(services => {
            res.status(200).json(services)
        })
        .catch(err => res.send(err))
})


module.exports = router;
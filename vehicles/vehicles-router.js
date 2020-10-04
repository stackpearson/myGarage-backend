const router = require('express').Router();
const Vehicles = require('./vehicles-model.js');
const restricted = require('../utils/restricted-endpoint.js');

//   -api/vehicles- //

//returns a list of vehicles linked to the user Id provided in the URL
router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Vehicles.findVehicles(id)
        .then(vehicles => {
            res.status(200).json(vehicles)
        })
        .catch(err => res.send(err))
})

//adds a vehicle for the linked user and relates the vehicle to their user id
//returns the vehicle details and the vehicleRelationId
router.post('/:id', restricted, async (req, res) => {
    let vehicle = req.body;

    const saved = await Vehicles.addVehicles(vehicle)
    

    const vehicleRelation = {
        user_id: req.params.id,
        vehicle_id: saved.id,
        service_id: null
    }

    const saved2 = await Vehicles.addVehicleRelation(vehicleRelation)
    console.log(saved2)

    try {
        if (saved2) {
            res.status(201).json({vehicleAdded: saved, vehicleRelationId: saved2.id})
        } else {
            res.status(500).json({message: 'server error from vehicles router, vehicle not added'})
        }
        
    } catch (err) {
       next({apiCode:500, apiMessage:'server error', ...err}) 
    }
    
})


module.exports = router;
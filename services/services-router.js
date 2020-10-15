const router = require('express').Router();
const Services = require('./services-model.js');
const restricted = require('../utils/restricted-endpoint.js');

//api/services

//returns a list of services for the user specified in the params. Vehicle ID is supplied so they can be mapped through on the front end to match the appropriate vehicle
router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Services.findServices(id)
        .then(services => {
            res.status(200).json(services)
        })
        .catch(err => res.send(err))
})


router.post('/', restricted, async (req, res) => {
    let serviceName = req.body.service_name;
    let serviceDate = req.body.service_date;
    let serviceMileage = req.body.service_mileage;
    let nextServiceMileage = req.body.next_service_mileage;
    let nextServiceDate = req.body.next_service_date;
    let serviceNotes = req.body.service_notes;

    let serviceDetails = {
        'service_name': serviceName,
        'service_date': serviceDate,
        'service_mileage': serviceMileage,
        'next_service_date': nextServiceDate,
        'next_service_mileage': nextServiceMileage,
        'service_notes': serviceNotes
    }
    let vehicle_id = req.body.vehicle_id;
    let user_id = req.body.user_id;

    const savedService = await Services.addServices(serviceDetails)
    
    const serviceRelation = {
        user_id: user_id,
        vehicle_id: vehicle_id,
        service_id: savedService.id
    }

    const savedRelation = await Services.addServiceRelation(serviceRelation)
    
    try {
        if (savedRelation) {
            res.status(201).json({serviceAdded: savedService, savedRelation: savedRelation })
        } else {
            res.status(500).json({message: 'server error from services router, vehicle not added'})
            console.log(error)
        }
        
        
        
    } catch (err) {
        next({apiCode:500, apiMessage:'error adding service from service router', ...err})
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Services.removeService(id)
        .then((del) => {
            res.status(200).json({message: 'service deleted'})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'server error', ...err})
        })

})


module.exports = router;
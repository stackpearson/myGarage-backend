const db = require('../database/db-config.js');

function findVehicles(id) {
    return db('vehicles as v')
        .join('user_vehicles as u', 'u.vehicle_id', 'v.id')
        .select('v.vehicle_make', 'v.vehicle_model', 'v.vehicle_year', 'v.id')
        .where('u.user_id', '=', `${id}`)
}

function findById(id) {
    return db('vehicles').where({ id }).first()
}

function findRelationById(id) {
    return db('user_vehicles').where({ id }).first();
}

async function addVehicles(vehicle) {
    try {
        const [id] = await db('vehicles').insert(vehicle, 'id');
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function addVehicleRelation(vehicleRelation) {
    try {
        const [id] = await db('user_vehicles').insert(vehicleRelation, 'id')
        return findRelationById(id);
    } catch (error) {
        
        throw error;
    }
}

async function removeVehicle(id) {
    try {
        await removeServices(id)
        await removeServiceRelations(id)
        return db('vehicles')
            .where('id', '=', `${id}`)
            .del();
    } catch(error) {
        throw error;
    }

}

function removeServices(id) {
    return db('user_vehicles')
        .where('vehicle_id', '=', `${id}`)
        .del();
}

function removeServiceRelations(id) {
    return db('user_services')
        .where('vehicle_id', '=', `${id}`)
        .del();
}




module.exports = {
    findVehicles,
    findById,
    addVehicles,
    addVehicleRelation,
    findRelationById,
    removeVehicle,
    removeServices,
    removeServiceRelations
}
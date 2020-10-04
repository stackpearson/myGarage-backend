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


module.exports = {
    findVehicles,
    findById,
    addVehicles,
    addVehicleRelation,
    findRelationById
}
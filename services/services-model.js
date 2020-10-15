const db = require('../database/db-config.js');


//Takes in a user_id provided via params, returns all services for that user_id
function findServices(id) {
    return db('user_services as us')
        .join('user_vehicles as uv', 'us.id', 'uv.service_id')
        .select('uv.vehicle_id', 'us.id', 'us.service_name', 'us.service_date', 'us.service_mileage', 'us.next_service_date', 'us.next_service_mileage', 'us.service_notes')
        .where('uv.user_id', '=', `${id}`)
}

function findServiceById(id) {
    return db('user_services').where({ id }).first();
}

function findRelationById(id) {
    return db('user_vehicles').where({ id }).first();
}

async function addServices(service) {
    try {
        const [id] = await db('user_services').insert(service, 'id');
        return findServiceById(id);
    } catch (error) {
        throw error;
    }
}

async function addServiceRelation(serviceRelation) {
   try {
    // const service =  await db('user_vehicles').where('user_vehicles.vehicle_id', '=', `${serviceRelation.vehicle_id}`).update({service_id: `${serviceRelation.service_id}`})
    const [id] = await db('user_vehicles').insert(serviceRelation, 'id')
    return findRelationById(id)
    // console.log(service)
   } catch (error) {
       throw error;
   } 
}

async function removeService(id) {
    try {
        await removeServiceRelation(id)
        return db('user_services')
            .where({ id })
            .del();
    } catch (error) {
       throw error; 
    }

}

function removeServiceRelation(id) {
    return db('user_vehicles')
        .where('service_id', '=', `${id}`)
        .del();
}





module.exports = {
    findServices,
    addServices,
    findServiceById,
    addServiceRelation,
    findRelationById,
    removeService,
    removeServiceRelation
}
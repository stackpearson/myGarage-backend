const db = require('../database/db-config.js');

function findVehicles(id) {
    return db('vehicles as v')
        .join('user_vehicles as u', 'u.vehicle_id', 'v.id')
        .select('v.vehicle_make', 'v.vehicle_model', 'v.vehicle_year', 'v.id')
        .where('u.user_id', '=', `${id}`)
}


module.exports = {
    findVehicles
}
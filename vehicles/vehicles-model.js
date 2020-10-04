const db = require('../database/db-config.js');

function find(id) {
    return db('vehicles as v')
        .join('user_vehicles as u', 'u.vehicle_id', 'v.id')
        .select('v.vehicle_make', 'v.vehicle_model', 'v.vehicle_year', 'u.user_id')
        .where('u.user_id', '=', `${id}`)
}


module.exports = {
    find
}
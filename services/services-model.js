const db = require('../database/db-config.js');

function findServices(id) {
    return db('user_services as us')
        .join('user_vehicles as uv', 'us.id', 'uv.service_id')
        .select('uv.vehicle_id', 'us.service_name', 'us.service_date', 'us.service_mileage', 'us.next_service_date', 'us.next_service_mileage', 'us.service_notes')
        .where('uv.user_id', '=', `${id}`)
}



module.exports = {
    findServices
}
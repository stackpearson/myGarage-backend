
exports.seed = function(knex) {
      return knex('user_vehicles').insert([
        {user_id: 1, vehicle_id: 1, service_id: 1},
        {user_id: 1, vehicle_id: 2, service_id: 2},
        {user_id: 2, vehicle_id: 3, service_id: 3}
      ]);
};

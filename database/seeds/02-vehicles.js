
exports.seed = function(knex) {
      return knex('vehicles').insert([
        { vehicle_make: 'Dodge', vehicle_model: 'Durango', vehicle_year: 2000},
        { vehicle_make: 'Yamaha', vehicle_model: 'YZF-R3', vehicle_year: 2016},
        { vehicle_make: 'Infiniti', vehicle_model: 'G37s', vehicle_year: 2008}
      ]);
};

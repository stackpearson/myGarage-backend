
exports.seed = function(knex) {

      return knex('user_services').insert([
        {service_name: 'Oil Change', service_date: 'Oct 1st, 2020', service_mileage: 106000, next_service_date: 'April 1st, 2021', next_service_mileage: 111000, service_notes: 'oil filter access near front driver side of bumper' },
        {service_name: 'Oil Change', service_date: 'June 1st, 2020', service_mileage: 13000, next_service_date: 'Dec 1st, 2020', next_service_mileage: 16000, service_notes: 'valves within spec' },
        {service_name: 'Brake Job', service_date: 'Aug 1st, 2020', service_mileage: 71000, next_service_date: null, next_service_mileage: 100000, service_notes: 'resurfaced rotors' }

      ]);
};

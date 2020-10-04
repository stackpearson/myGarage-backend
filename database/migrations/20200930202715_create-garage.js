exports.up = function(knex) {
    return knex.schema
      .createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 128)
            .notNullable()
            .unique()
            .index();
        tbl.string('password', 256)
            .notNullable();
      })
      
      .createTable('user_services', tbl => {
        tbl.increments();
        tbl.string('service_name', 128)
            .notNullable();
        tbl.string('service_date', 128);
        tbl.integer('service_mileage')
            .notNullable();
        tbl.string('next_service_date', 128);
        tbl.integer('next_service_mileage')
            .notNullable();
        tbl.string('service_notes', 256);
      })

      .createTable('vehicles', tbl => {
        tbl.increments();
        tbl.string('vehicle_make', 128)
            .notNullable();
        tbl.string('vehicle_model', 128)
            .notNullable();
        tbl.integer('vehicle_year')
            .notNullable();
      })

      .createTable('user_vehicles', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('users.id');
        tbl.integer('vehicle_id')
            .unsigned()
            .notNullable()
            .references('vehicles.id');
        tbl.integer('service_id')
            .unsigned()
            .references('user_services.id');
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
        .dropTableIfExists('user_vehicles')
        .dropTableIfExists('vehicles')
        .dropTableIfExists('user_services')
        .dropTableIfExists('users');
     
    
  };
# myGarage-backend

//get users vehicles
select vehicle_make, vehicle_model, vehicle_year
from 'vehicles' as v
join 'user_vehicles' as u
on u.vehicle_id = v.id
where u.user_id = 1
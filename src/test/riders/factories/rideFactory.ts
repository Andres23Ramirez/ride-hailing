import { faker } from '@faker-js/faker';
import { createDriver } from 'src/test/drivers/factories/driverFactory';
import { Ride } from '../../../riders/entities/ride.entity';
import { createRider } from './riderFactory';

export const createRide = (): Ride => {
  const rider = createRider();
  const driver = createDriver();
  const ride = new Ride();
  ride.startLocationLat = parseInt(faker.address.latitude());
  ride.startLocationLng = parseInt(faker.address.longitude());
  ride.endLocationLat = parseInt(faker.address.latitude());
  ride.endLocationLng = parseInt(faker.address.longitude());
  ride.rider = rider;
  ride.driver = driver;

  return ride;
};

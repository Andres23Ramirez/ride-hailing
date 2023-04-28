import { faker } from '@faker-js/faker';
import { Rider } from '../entities/rider.entity';

export const createRider = (): Rider => {
  const rider = new Rider();
  rider.firstName = faker.name.firstName();
  rider.lastName = faker.name.lastName();
  rider.email = faker.internet.email();
  rider.phoneNumber = faker.phone.number();
  rider.paymentSourceId = parseInt(faker.random.numeric(5));

  return rider;
};

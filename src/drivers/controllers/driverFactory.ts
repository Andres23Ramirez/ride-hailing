import { faker } from '@faker-js/faker';
import { Driver } from '../entities/driver.entity';

export const createDriver = (): Driver => {
  const driver = new Driver();
  driver.firstName = faker.name.firstName();
  driver.lastName = faker.name.lastName();
  driver.email = faker.internet.email();
  driver.phoneNumber = faker.phone.number();
  driver.rating = parseInt(faker.random.numeric());

  return driver;
};

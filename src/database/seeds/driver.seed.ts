import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class DriverSeederService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async seed(): Promise<void> {
    const drivers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '+1-202-555-0184',
        rating: 4,
        rides: [],
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        phoneNumber: '+1-202-555-0192',
        rating: 3,
        rides: [],
      },
    ];

    await this.driverRepository.save(drivers);
  }
}

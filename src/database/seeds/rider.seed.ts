import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rider } from 'src/riders/entities/rider.entity';

@Injectable()
export class RiderSeederService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
  ) {}

  async seed(): Promise<void> {
    const riders = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '+1-202-555-0184',
        paymentSourceId: null,
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        phoneNumber: '+1-202-555-0192',
        paymentSourceId: null,
      },
    ];

    await this.riderRepository.save(riders);
  }
}

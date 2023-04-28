import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';

import { Rider } from 'src/riders/entities/rider.entity';
import { DriverSeederService } from './driver.seed';
import { RiderSeederService } from './rider.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Rider, Driver])],
  providers: [RiderSeederService, DriverSeederService],
})
export class SeederModule implements OnModuleInit {
  constructor(
    private readonly riderSeederService: RiderSeederService,
    private readonly driverSeederService: DriverSeederService,
  ) {}

  async onModuleInit() {
    const shouldSeed = process.env.SEED_DB === 'true';
    if (shouldSeed) {
      console.log('Populating database...');
      await this.riderSeederService.seed();
      await this.driverSeederService.seed();
      console.log('Database population complete.');
    }
  }
}

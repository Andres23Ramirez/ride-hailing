import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { Ride } from 'src/riders/entities/ride.entity';
import { Rider } from 'src/riders/entities/rider.entity';
import { RidersModule } from 'src/riders/riders.module';

import { DriversController } from './controllers/drivers.controller';
import { Driver } from './entities/driver.entity';
import { DriversService } from './services/drivers.service';

@Module({
  imports: [
    RidersModule,
    AppConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Ride, Rider, Driver]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}

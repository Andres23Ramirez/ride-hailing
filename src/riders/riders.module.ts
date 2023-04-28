import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from 'src/config/config.module';
import { RidersController } from './controllers/riders.controller';
import { RidersService } from './services/riders.service';
import { Ride } from './entities/ride.entity';
import { Rider } from './entities/rider.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Module({
  imports: [
    AppConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Ride, Rider, Driver]),
  ],
  controllers: [RidersController],
  providers: [RidersService],
  exports: [RidersService],
})
export class RidersModule {}

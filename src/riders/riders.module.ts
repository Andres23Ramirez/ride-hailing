import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from 'src/config/config.module';
import { RidersController } from './controllers/riders.controller';
import { RidersService } from './services/riders.service';
import { Ride } from './entities/ride.entity';

@Module({
  imports: [AppConfigModule, HttpModule, TypeOrmModule.forFeature([Ride])],
  controllers: [RidersController],
  providers: [RidersService],
  exports: [RidersService],
})
export class RidersModule {}

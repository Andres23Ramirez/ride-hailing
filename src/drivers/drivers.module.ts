import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { RidersModule } from 'src/riders/riders.module';

import { DriversController } from './controllers/drivers.controller';
import { DriversService } from './services/drivers.service';

@Module({
  imports: [RidersModule, AppConfigModule, HttpModule],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}

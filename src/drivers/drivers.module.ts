import { Module } from '@nestjs/common';

import { DriversController } from './controllers/drivers.controller';
import { DriversService } from './services/drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}

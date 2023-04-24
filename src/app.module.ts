import { Module } from '@nestjs/common';
import { RidersController } from './controllers/riders/riders.controller';
import { DriversController } from './controllers/drivers/drivers.controller';
import { DriversService } from './services/drivers/drivers.service';
import { RidersService } from './services/riders/riders.service';

@Module({
  imports: [],
  controllers: [RidersController, DriversController],
  providers: [DriversService, RidersService],
})
export class AppModule {}

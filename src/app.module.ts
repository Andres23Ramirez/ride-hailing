import { Module } from '@nestjs/common';
import { RidersController } from './controllers/riders/riders.controller';
import { DriversController } from './controllers/drivers/drivers.controller';

@Module({
  imports: [],
  controllers: [RidersController, DriversController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RidersController } from './controllers/riders/riders.controller';
import { DriversController } from './controllers/drivers/drivers.controller';
import { DriversService } from './services/drivers/drivers.service';
import { RidersService } from './services/riders/riders.service';
import { ConfigAppService } from './config/config.service';
import { AppConfigModule } from './config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule, AppConfigModule],
  controllers: [RidersController, DriversController],
  providers: [DriversService, RidersService, ConfigService, ConfigAppService],
})
export class AppModule {}

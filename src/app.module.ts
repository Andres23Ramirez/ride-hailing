import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigAppService } from './config/config.service';
import { AppConfigModule } from './config.module';
import { ConfigService } from '@nestjs/config';
import { RidersModule } from './riders/riders.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [HttpModule, AppConfigModule, RidersModule, DriversModule],
  controllers: [],
  providers: [ConfigService, ConfigAppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigAppService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { RidersModule } from './riders/riders.module';
import { DriversModule } from './drivers/drivers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    AppConfigModule,
    RidersModule,
    DriversModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [ConfigService, ConfigAppService],
})
export class AppModule {}

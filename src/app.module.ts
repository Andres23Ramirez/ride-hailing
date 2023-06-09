import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigAppService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
import { RidersModule } from './riders/riders.module';
import { DriversModule } from './drivers/drivers.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from 'src/database/seeds/seeding.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    DatabaseModule,
    AppConfigModule,
    TypeOrmModule,
    RidersModule,
    DriversModule,
    SeederModule,
  ],
  controllers: [],
  providers: [ConfigService, ConfigAppService],
})
export class AppModule {}

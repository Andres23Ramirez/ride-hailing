import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { RidersController } from './controllers/riders.controller';
import { RidersService } from './services/riders.service';

@Module({
  imports: [AppConfigModule, HttpModule],
  controllers: [RidersController],
  providers: [RidersService],
  exports: [RidersService],
})
export class RidersModule {}

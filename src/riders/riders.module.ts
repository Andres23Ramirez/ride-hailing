import { Module } from '@nestjs/common';
import { RidersController } from './controllers/riders.controller';
import { RidersService } from './services/riders.service';

@Module({
  controllers: [RidersController],
  providers: [RidersService],
})
export class RidersModule {}

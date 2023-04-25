import { Controller, Post, Body } from '@nestjs/common';
import { RequestRideDto } from 'src/dtos/riders.dto';
import { Ride } from '../../entities/ride.entity';
import { RidersService } from '../../services/riders/riders.service';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post('payment-source')
  createPaymentSource(@Body() payload: any) {
    return {
      message: 'Create a Payment Source',
      payload,
    };
  }

  @Post('/rides')
  requestRide(@Body() payload: RequestRideDto): Ride {
    return this.ridersService.requestRide(payload);
  }
}

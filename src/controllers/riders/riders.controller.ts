import { Controller, Post, Body } from '@nestjs/common';
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
  requestRide(
    @Body('startLocationLat') startLocationLat: number,
    @Body('startLocationLng') startLocationLng: number,
    @Body('endLocationLat') endLocationLat: number,
    @Body('endLocationLng') endLocationLng: number,
    @Body('riderId') riderId: number,
  ): Ride {
    return this.ridersService.requestRide(
      startLocationLat,
      startLocationLng,
      endLocationLat,
      endLocationLng,
      riderId,
    );
  }
}

import { Controller, Post, Put, Body, Param } from '@nestjs/common';
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

  @Put('start-ride/:id')
  putStarRide(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
      message: 'Start Ride',
    };
  }
}

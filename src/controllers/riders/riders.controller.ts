import { Controller, Post, Body } from '@nestjs/common';
import { RequestRideDto } from 'src/dtos/riders.dto';
import { PaymentSourceDto } from 'src/dtos/paymentSourceResponse.dto';
import { Ride } from '../../entities/ride.entity';
import { RidersService } from '../../services/riders/riders.service';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post('payment-source')
  createPaymentSource(@Body() payload: PaymentSourceDto) {
    return this.ridersService.createPaymentSource(payload);
  }

  @Post('/rides')
  requestRide(@Body() payload: RequestRideDto): Ride {
    return this.ridersService.requestRide(payload);
  }
}

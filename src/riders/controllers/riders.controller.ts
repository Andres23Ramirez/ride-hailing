import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { RequestRideDto } from 'src/riders/dtos/riders.dto';
import { PaymentSourceDto } from 'src/riders/dtos/paymentSourceResponse.dto';
import { Ride } from 'src/riders/entities/ride.entity';
import { RidersService } from 'src/riders/services/riders.service';

@ApiTags('riders')
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post('payment-source')
  @ApiOperation({ summary: 'Create a payment source for a rider' })
  async createPaymentSource(@Body() payload: PaymentSourceDto) {
    return await this.ridersService.createPaymentSource(payload);
  }

  @Post('/rides')
  @ApiOperation({ summary: 'Request a ride' })
  async requestRide(@Body() payload: RequestRideDto): Promise<Ride> {
    return await this.ridersService.requestRide(payload);
  }
}

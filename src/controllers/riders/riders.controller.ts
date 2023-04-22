import { Controller, Post, Put } from '@nestjs/common';

@Controller('riders')
export class RidersController {
  @Post('payment-source')
  postPaymentSource() {
    return 'Create a Payment Source';
  }

  @Post('ride')
  postRide() {
    return 'Create a Ride';
  }

  @Put('start-ride')
  putStarRide() {
    return 'Start Ride';
  }
}

import { Controller, Post, Put, Body, Param } from '@nestjs/common';

@Controller('riders')
export class RidersController {
  @Post('payment-source')
  createPaymentSource(@Body() payload: any) {
    return {
      message: 'Create a Payment Source',
      payload,
    };
  }

  @Post('ride')
  postRide(@Body() payload: any) {
    return {
      message: 'Create a Ride',
      payload,
    };
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

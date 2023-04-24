import { Controller, Post, Put, Body, Param } from '@nestjs/common';

@Controller('drivers')
export class DriversController {
  @Put('finish-ride/:id')
  putFinishRide(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
      message: 'Finish Ride',
    };
  }

  @Post('charge-ride')
  postRide(@Body() payload: any) {
    return {
      message: 'Create a charging',
      payload,
    };
  }
}

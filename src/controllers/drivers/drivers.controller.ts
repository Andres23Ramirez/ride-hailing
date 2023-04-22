import { Controller, Post, Put } from '@nestjs/common';

@Controller('drivers')
export class DriversController {
  @Put('finish-ride')
  putStarRide() {
    return 'Finish Ride';
  }

  @Post('charge-ride')
  postRide() {
    return 'Charge Ride';
  }
}

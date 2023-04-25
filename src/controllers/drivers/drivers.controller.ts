import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DriversService } from '../../services/drivers/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Put('finish-ride/:id')
  putFinishRide(
    @Param('id', ParseIntPipe) id: number,
    @Body('endLocationLat') endLocationLat: number,
    @Body('endLocationLng') endLocationLng: number,
  ): { success: boolean; message: string } {
    const total = this.driversService.finishRide(
      id,
      endLocationLat,
      endLocationLng,
    );
    return {
      success: true,
      message: `Ride with id ${id} finished. Total cost: $${total}`,
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

import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FinishRideDto } from 'src/dtos/drivers.dto';
import { DriversService } from '../../services/drivers/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Put('finish-ride/:id')
  putFinishRide(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: FinishRideDto,
  ): { success: boolean; message: string } {
    const total = this.driversService.finishRide(id, payload);
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

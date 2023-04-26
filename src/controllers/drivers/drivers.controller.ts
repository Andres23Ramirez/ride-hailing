import { Controller, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FinishRideDto } from 'src/dtos/drivers.dto';
import { DriversService } from '../../services/drivers/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Put('finish-ride/:id')
  putFinishRide(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: FinishRideDto,
  ) {
    return this.driversService.finishRide(id, payload);
  }
}

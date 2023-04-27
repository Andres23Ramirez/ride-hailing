import { Controller, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { FinishRideDto } from 'src/drivers/dtos/drivers.dto';
import { DriversService } from 'src/drivers/services/drivers.service';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Put('finish-ride/:id')
  @ApiOperation({
    summary:
      'Finish a ride and create a transactions charging the total amount',
  })
  putFinishRide(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: FinishRideDto,
  ) {
    return this.driversService.finishRide(id, payload);
  }
}

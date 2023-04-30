import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from 'src/drivers/controllers/drivers.controller';
import { DriversService } from 'src/drivers/services/drivers.service';
import { FinishRideDto } from 'src/drivers/dtos/drivers.dto';
import { expectedResult } from 'src/drivers/constants/transactionResponse.constant';

describe('DriversController', () => {
  let controller: DriversController;
  let driversService: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: DriversService,
          useValue: {
            finishRide: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DriversController>(DriversController);
    driversService = module.get<DriversService>(DriversService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('putFinishRide', () => {
    const rideId = 1;
    const payload: FinishRideDto = {
      endLocationLat: 4.75,
      endLocationLng: -10.5,
    };

    it('should return the result of driversService.finishRide', async () => {
      jest
        .spyOn(driversService, 'finishRide')
        .mockResolvedValue(expectedResult);

      const result = await controller.putFinishRide(rideId, payload);

      expect(result).toBe(expectedResult);
      expect(driversService.finishRide).toHaveBeenCalledWith(rideId, payload);
    });
  });
});

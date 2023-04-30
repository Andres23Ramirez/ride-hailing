import { Test, TestingModule } from '@nestjs/testing';

import { RidersController } from 'src/riders/controllers/riders.controller';
import { RidersService } from 'src/riders/services/riders.service';
import { RequestRideDto } from 'src/riders/dtos/riders.dto';
import { PaymentSourceDto } from 'src/riders/dtos/paymentSourceResponse.dto';
import { Ride } from 'src/riders/entities/ride.entity';
import { createRide } from 'src/test/riders/factories/rideFactory';
import { expectedPaymentSourceResponse } from 'src/riders/constants/transactionResponse.constant';

describe('RidersController', () => {
  let controller: RidersController;
  let ridersService: RidersService;
  const ride = createRide();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidersController],
      providers: [
        {
          provide: RidersService,
          useValue: {
            createPaymentSource: jest.fn(),
            requestRide: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RidersController>(RidersController);
    ridersService = module.get<RidersService>(RidersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createPaymentSource', () => {
    const payload: PaymentSourceDto = {
      type: 'CARD',
      token: 'aFd3s3mi3imL3',
      customer_email: 'test@example.com',
    };

    it('should return the result of ridersService.createPaymentSource', async () => {
      jest
        .spyOn(ridersService, 'createPaymentSource')
        .mockResolvedValue(expectedPaymentSourceResponse);

      const result = await controller.createPaymentSource(payload);

      expect(result).toEqual(expectedPaymentSourceResponse);
      expect(ridersService.createPaymentSource).toHaveBeenCalledWith(payload);
    });
  });

  describe('requestRide', () => {
    const payload: RequestRideDto = {
      riderId: 1,
      startLocationLat: 4.75,
      startLocationLng: -10.5,
      endLocationLat: 4.5,
      endLocationLng: -10.75,
    };

    it('should return the result of ridersService.requestRide', async () => {
      const expectedRide: Ride = ride;

      jest.spyOn(ridersService, 'requestRide').mockResolvedValue(expectedRide);

      const result = await controller.requestRide(payload);

      expect(result).toEqual(expectedRide);
      expect(ridersService.requestRide).toHaveBeenCalledWith(payload);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RidersService } from 'src/riders/services/riders.service';

describe('RidersService', () => {
  let service: RidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RidersService,
          useValue: {
            finishRide: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RidersService>(RidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

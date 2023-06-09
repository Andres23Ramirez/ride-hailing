import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { Ride } from 'src/riders/entities/ride.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Rider } from 'src/riders/entities/rider.entity';
import { RequestRideDto } from 'src/riders/dtos/riders.dto';
import { PaymentSourceDto } from 'src/riders/dtos/paymentSourceResponse.dto';
import { PaymentSourceResponse } from 'src/riders/interfaces/paymentSource.interface';
import { ConfigAppService } from 'src/config/config.service';
import { RideStatus } from 'src/enums/RideStatus';

@Injectable()
export class RidersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configAppService: ConfigAppService,
    @InjectRepository(Ride) private ridesRepo: Repository<Ride>,
    @InjectRepository(Rider) private ridersRepo: Repository<Rider>,
    @InjectRepository(Driver) private driversRepo: Repository<Driver>,
  ) {}

  getAllRides() {
    return this.ridesRepo.find();
  }

  getAllRiders() {
    return this.ridersRepo.find();
  }

  async requestRide(payload: RequestRideDto): Promise<Ride> {
    const rider = await this.ridersRepo.findOne({
      where: {
        id: payload.riderId,
      },
    });

    if (!rider) {
      throw new UnprocessableEntityException(
        `The rider with id ${payload.riderId} does not exist.`,
      );
    }

    const driver = await this.findAvailableDriver();
    if (!driver) {
      throw new UnprocessableEntityException(
        'No available drivers at the moment',
      );
    }

    const newPayload = {
      ...payload,
      rider: rider,
      driver: driver,
      status: 'Started',
      startTime: new Date(),
    };

    const newRide = this.ridesRepo.create(newPayload);

    if (!newRide) {
      throw new UnprocessableEntityException('Ride could not create');
    }

    const newRideSaved = await this.ridesRepo.save(newRide);

    if (!newRideSaved) {
      throw new UnprocessableEntityException('Ride could not saved');
    }

    return newRideSaved;
  }

  async createPaymentSource(
    payload: PaymentSourceDto,
  ): Promise<Observable<PaymentSourceResponse>> {
    const rider = await this.ridersRepo.findOne({
      where: {
        email: payload.customer_email,
      },
    });

    if (!rider) {
      throw new UnprocessableEntityException(
        `The rider with email: ${payload.customer_email} does not exist.`,
      );
    }

    const url = `${this.configAppService.baseUrl}payment_sources`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.secretKey}`,
      'Content-Type': 'application/json',
    };

    return this.getAcceptanceToken().pipe(
      map((acceptanceToken) => ({
        ...payload,
        acceptance_token: acceptanceToken,
      })),
      map((payloadWithAcceptanceToken) =>
        this.httpService.post(url, payloadWithAcceptanceToken, { headers }),
      ),
      switchMap((response) => response),
      map((response) => response?.data),
      catchError((error) =>
        throwError(
          () => new UnprocessableEntityException(error.response?.data?.error),
        ),
      ),
      switchMap(async (paymentSource: PaymentSourceResponse) => {
        rider.paymentSourceId = paymentSource?.data?.id;
        await this.ridersRepo.save(rider);
        return paymentSource;
      }),
    );
  }

  async getRideByDriverId(driverId: number): Promise<Ride> {
    const ride = await this.ridesRepo.findOne({
      where: {
        driver: { id: driverId },
        status: RideStatus.Started,
      },
      relations: ['rider'],
    });

    if (!ride) {
      throw new NotFoundException(
        `Driver with id ${driverId} don't have rides started`,
      );
    }

    return ride;
  }

  private getAcceptanceToken(): Observable<any> {
    const url = `${this.configAppService.baseUrl}merchants/${this.configAppService.publicKey}`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.secretKey}`,
      'Content-Type': 'application/json',
    };

    return this.httpService.get(url, { headers }).pipe(
      map(
        (response) =>
          response?.data?.data?.presigned_acceptance?.acceptance_token,
      ),
      catchError((error) =>
        throwError(
          () => new UnprocessableEntityException(error.response?.data?.error),
        ),
      ),
    );
  }

  private async findAvailableDriver(): Promise<Driver> {
    const driver = await this.driversRepo.findOne({
      where: {
        rides: {
          status: Not(RideStatus.Started),
        },
      },
      relations: ['rides'],
    });

    if (driver) {
      return driver;
    } else {
      const [firstRow] = await this.driversRepo.find({ take: 1 });
      return firstRow;
    }
  }
}

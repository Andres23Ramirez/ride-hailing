import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Ride } from 'src/riders/entities/ride.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Rider } from 'src/riders/entities/rider.entity';
import { RequestRideDto } from 'src/riders/dtos/riders.dto';
import { PaymentSourceDto } from 'src/riders/dtos/paymentSourceResponse.dto';
import { PaymentSourceResponse } from 'src/riders/interfaces/paymentSource.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfigAppService } from 'src/config/config.service';
import { RideStatus } from 'src/enums/RideStatus';

@Injectable()
export class RidersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configAppService: ConfigAppService,
  ) {}

  private rides: Ride[] = [
    {
      id: 1,
      startLocationLat: 4.65,
      startLocationLng: -74.05,
      endLocationLat: 4.6,
      endLocationLng: -74.08,
      riderId: 1,
      driverId: 2,
      status: 'Started',
      startTime: new Date('2022-05-01T12:00:00Z'),
      endTime: new Date('2022-05-01T12:30:00Z'),
    },
    {
      id: 2,
      startLocationLat: 4.7,
      startLocationLng: -74.05,
      endLocationLat: 4.8,
      endLocationLng: -74.1,
      riderId: 2,
      driverId: 1,
      status: 'Finished',
      startTime: new Date('2022-05-01T13:00:00Z'),
      endTime: new Date('2022-05-01T13:30:00Z'),
    },
    {
      id: 3,
      startLocationLat: 4.6,
      startLocationLng: -74.1,
      endLocationLat: 4.55,
      endLocationLng: -74.05,
      riderId: 1,
      driverId: 2,
      status: 'Finished',
      startTime: new Date('2022-05-01T14:00:00Z'),
      endTime: null,
    },
  ];
  private riders: Rider[] = [
    {
      id: 1,
      firstName: 'Pedro',
      lastName: 'Pérez',
      email: 'pepito_perezasadaqwef@example.com',
      phoneNumber: '555-9876',
      paymentSourceId: 53239,
    },
  ];
  private drivers: Driver[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      phoneNumber: '555-1234',
      rating: 4.5,
    },
    {
      id: 2,
      firstName: 'Maria',
      lastName: 'Gonzalez',
      email: 'maria.gonzalez@example.com',
      phoneNumber: '555-5678',
      rating: 4.8,
    },
  ];

  getAllRides() {
    return this.rides;
  }

  getAllRiders() {
    return this.riders;
  }

  requestRide(payload: RequestRideDto): Ride {
    const driver = this.findAvailableDriver();
    if (!driver) {
      throw new UnprocessableEntityException(
        'No available drivers at the moment',
      );
    }

    const {
      startLocationLat,
      startLocationLng,
      endLocationLat,
      endLocationLng,
      riderId,
    } = payload;

    const ride: Ride = {
      id: this.rides.length + 1,
      startLocationLat,
      startLocationLng,
      endLocationLat,
      endLocationLng,
      riderId,
      driverId: driver.id,
      status: 'Started',
      startTime: new Date(),
      endTime: new Date(),
    };
    if (!ride) {
      throw new UnprocessableEntityException('Ride could not create');
    }

    this.rides.push(ride);

    return ride;
  }

  createPaymentSource(
    payload: PaymentSourceDto,
  ): Observable<PaymentSourceResponse> {
    const url = `${this.configAppService.baseUrl}payment_sources`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.secretKey}`,
      'Content-Type': 'application/json',
    };

    // Mezclando el payload con el acceptance_token obtenido
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
    );
  }

  getRideByDriverId(driverId: number): Ride {
    const ride = this.rides.find(
      (ride) =>
        ride.driverId === driverId && ride.status === RideStatus.Started,
    );

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

  private findAvailableDriver(): Driver {
    return this.drivers.find((driver) => {
      const isOnRide = this.rides.some(
        (ride) => ride.driverId === driver.id && ride.status !== 'Finished',
      );
      return !isOnRide;
    });
  }
}

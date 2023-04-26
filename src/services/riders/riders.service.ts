import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Ride } from 'src/entities/ride.entity';
import { Driver } from 'src/entities/driver.entity';
import { Rider } from 'src/entities/rider.entity';
import { RequestRideDto } from 'src/dtos/riders.dto';
import { PaymentSourceDto } from 'src/dtos/paymentSourceResponse.dto';
import { PaymentSourceResponse } from 'src/interfaces/paymentSource.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConfigAppService } from 'src/config/config.service';

@Injectable()
export class RidersService {
  private rides: Ride[] = [];
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
  private riders: Rider[] = [
    {
      id: 1,
      firstName: 'Pedro',
      lastName: 'Ramírez',
      email: 'pedro.ramirez@example.com',
      phoneNumber: '555-9876',
      paymentSourceId: 53239,
    },
    {
      id: 2,
      firstName: 'Ana',
      lastName: 'Martinez',
      email: 'ana.martinez@example.com',
      phoneNumber: '555-4321',
      paymentSourceId: 53239,
    },
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly configAppService: ConfigAppService,
  ) {}

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
    const url = `${this.configAppService.wompiBaseUrl}payment_sources`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.wompiSecretKey}`,
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

  private getAcceptanceToken(): Observable<any> {
    const url = `${this.configAppService.wompiBaseUrl}merchants/${this.configAppService.wompiPublicKey}`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.wompiSecretKey}`,
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

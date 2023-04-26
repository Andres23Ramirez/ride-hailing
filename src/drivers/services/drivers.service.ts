import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FinishRideDto } from 'src/drivers/dtos/drivers.dto';
import { Rider } from 'src/riders/entities/rider.entity';
import { Ride } from 'src/riders/entities/ride.entity';
import { RideStatus } from '../../enums/RideStatus';
import { ConfigAppService } from 'src/config/config.service';
import { TransactionDto } from 'src/drivers/dtos/transactions.dto';
import { TransactionResponse } from 'src/drivers/interfaces/transactionResponse.interface';
import { catchError, Observable, throwError, map } from 'rxjs';

import { RidersService } from 'src/riders/services/riders.service';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configAppService: ConfigAppService,
    private readonly ridersService: RidersService,
  ) {}

  private riders: Rider[] = this.ridersService.getAllRiders();
  private rides: Ride[] = this.ridersService.getAllRides();
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

  finishRide(
    driverId: number,
    { endLocationLat, endLocationLng }: FinishRideDto,
  ): Observable<TransactionResponse> {
    const ride = this.ridersService.getRideByDriverId(driverId);

    if (!ride) {
      throw new NotFoundException(
        `Driver with id ${driverId} don't have rides started`,
      );
    }

    const distance = this.calculateDistance(
      ride.startLocationLat,
      ride.startLocationLng,
      endLocationLat,
      endLocationLng,
    );
    const duration = this.calculateDuration(ride.startTime, ride.endTime);
    const amountInCents = Math.round(this.calculateTotal(distance, duration));
    const paymentSourceId = this.getPaymentSourceIdByRiderId(ride.riderId);
    const customerEmail = this.getRiderById(ride.riderId).email;
    const payload = this.getPayload(
      amountInCents,
      paymentSourceId,
      customerEmail,
    );
    const url = `${this.configAppService.wompiBaseUrl}transactions`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.wompiSecretKey}`,
      'Content-Type': 'application/json',
    };

    ride.endLocationLat = endLocationLat;
    ride.endLocationLng = endLocationLng;
    ride.status = RideStatus.Finished;
    ride.endTime = new Date();

    const response = this.httpService.post(url, payload, { headers }).pipe(
      map((response) => response?.data),
      catchError((error) =>
        throwError(
          () => new UnprocessableEntityException(error.response?.data?.error),
        ),
      ),
    );

    return response;
  }

  getAllDrivers() {
    return this.drivers;
  }

  private getPayload(
    amountInCents: number,
    paymentSourceId: number,
    customer_email: string,
  ): TransactionDto {
    return {
      amount_in_cents: amountInCents,
      currency: 'COP',
      customer_email,
      payment_method: { installments: 1 },
      reference: (Math.random() + 1).toString(36).substring(7),
      payment_source_id: paymentSourceId,
    };
  }

  private getPaymentSourceIdByRiderId(riderId: number): number {
    const rider = this.riders.find((rider) => rider.id === riderId);

    if (!rider) {
      throw new NotFoundException(`Rider with id ${riderId} not found`);
    }

    return rider.paymentSourceId;
  }

  private getRiderById(riderId: number): Rider {
    const rider = this.riders.find((rider) => rider.id === riderId);
    return rider;
  }

  private calculateDistance(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ): number {
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(endLat - startLat);
    const dLon = this.degreesToRadians(endLng - startLng);
    const lat1 = this.degreesToRadians(startLat);
    const lat2 = this.degreesToRadians(endLat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadiusKm * c;

    return distanceInKm;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private calculateDuration(startTime: Date, endTime: Date): number {
    const diffInMs = endTime.getTime() - startTime.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);

    return diffInMinutes;
  }

  private calculateTotal(
    distanceInKm: number,
    durationInMinutes: number,
  ): number {
    const distanceFee = distanceInKm * 1000;
    const durationFee = durationInMinutes * 200;

    return (distanceFee + durationFee + 3500) * 100;
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FinishRideDto } from 'src/drivers/dtos/drivers.dto';
import { Rider } from 'src/riders/entities/rider.entity';
import { RideStatus } from '../../enums/RideStatus';
import { ConfigAppService } from 'src/config/config.service';
import { TransactionDto } from 'src/drivers/dtos/transactions.dto';
import { TransactionResponse } from 'src/drivers/interfaces/transactionResponse.interface';
import { catchError, Observable, throwError, map } from 'rxjs';

import { Driver } from '../entities/driver.entity';
import { RidersService } from 'src/riders/services/riders.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriversService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configAppService: ConfigAppService,
    private readonly ridersService: RidersService,
    @InjectRepository(Rider) private ridersRepo: Repository<Rider>,
    @InjectRepository(Driver) private driversRepo: Repository<Driver>,
  ) {}

  async finishRide(
    driverId: number,
    { endLocationLat, endLocationLng }: FinishRideDto,
  ): Promise<Observable<TransactionResponse>> {
    const ride = await this.ridersService.getRideByDriverId(driverId);

    if (!ride) {
      throw new NotFoundException(
        `Driver with id ${driverId} don't have rides started`,
      );
    }

    ride.endLocationLat = endLocationLat;
    ride.endLocationLng = endLocationLng;
    ride.status = RideStatus.Finished;
    ride.endTime = new Date();
    const paymentSourceId = ride.rider.paymentSourceId;
    const customerEmail = ride.rider.email;

    const distance = this.calculateDistance(
      ride.startLocationLat,
      ride.startLocationLng,
      endLocationLat,
      endLocationLng,
    );
    const duration = this.calculateDuration(ride.startTime, ride.endTime);
    const amountInCents = Math.round(this.calculateTotal(distance, duration));
    const payload = this.getPayload(
      amountInCents,
      paymentSourceId,
      customerEmail,
    );
    const url = `${this.configAppService.baseUrl}transactions`;
    const headers = {
      Authorization: `Bearer ${this.configAppService.secretKey}`,
      'Content-Type': 'application/json',
    };

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
    return this.driversRepo.find();
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
    const startDateTime = new Date(startTime);
    const diffInMs = endTime.getTime() - startDateTime.getTime();
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

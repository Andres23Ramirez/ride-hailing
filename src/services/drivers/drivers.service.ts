import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FinishRideDto } from 'src/dtos/drivers.dto';
import { Ride } from '../../entities/ride.entity';
import { RideStatus } from '../../enums/RideStatus';

@Injectable()
export class DriversService {
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
      status: 'InProgress',
      startTime: new Date('2022-05-01T14:00:00Z'),
      endTime: null,
    },
  ];

  finishRide(
    rideId: number,
    { endLocationLat, endLocationLng }: FinishRideDto,
  ): number {
    const ride = this.getRideById(rideId);

    if (!ride) {
      throw new NotFoundException(`Ride with id ${rideId} not found`);
    }

    if (ride.status === RideStatus.Finished) {
      throw new UnprocessableEntityException(
        `Ride with id ${rideId} is already finished`,
      );
    }

    ride.endLocationLat = endLocationLat;
    ride.endLocationLng = endLocationLng;
    ride.status = RideStatus.Finished;
    ride.endTime = new Date();

    const distance = this.calculateDistance(
      ride.startLocationLat,
      ride.startLocationLng,
      endLocationLat,
      endLocationLng,
    );
    const duration = this.calculateDuration(ride.startTime, ride.endTime);
    const total = this.calculateTotal(distance, duration);

    return total;
  }

  private getRideById(rideId: number): Ride {
    const ride = this.rides.find((ride) => ride.id === rideId);
    return ride;
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

    return distanceFee + durationFee + 3500;
  }
}

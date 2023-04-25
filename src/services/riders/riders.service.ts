import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Ride } from 'src/entities/ride.entity';
import { Driver } from 'src/entities/driver.entity';
import { Rider } from 'src/entities/rider.entity';
import { RequestRideDto } from 'src/dtos/riders.dto';

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
    },
    {
      id: 2,
      firstName: 'Ana',
      lastName: 'Martinez',
      email: 'ana.martinez@example.com',
      phoneNumber: '555-4321',
    },
  ];

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

  private findAvailableDriver(): Driver {
    return this.drivers.find((driver) => {
      const isOnRide = this.rides.some(
        (ride) => ride.driverId === driver.id && ride.status !== 'Finished',
      );
      return !isOnRide;
    });
  }
}

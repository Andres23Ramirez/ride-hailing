import { IsNumber, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class RequestRideDto {
  @IsNotEmpty()
  @IsLatitude()
  readonly startLocationLat: number;

  @IsNotEmpty()
  @IsLongitude()
  readonly startLocationLng: number;

  @IsLatitude()
  readonly endLocationLat: number;

  @IsLongitude()
  readonly endLocationLng: number;

  @IsNotEmpty()
  @IsNumber()
  readonly riderId: number;
}

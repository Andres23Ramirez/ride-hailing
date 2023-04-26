import { IsNumber, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class RequestRideDto {
  @IsNotEmpty()
  @IsLatitude()
  readonly startLocationLat: number;

  @IsNotEmpty()
  @IsLongitude()
  readonly startLocationLng: number;

  @IsNotEmpty()
  @IsLatitude()
  readonly endLocationLat: number;

  @IsNotEmpty()
  @IsLongitude()
  readonly endLocationLng: number;

  @IsNotEmpty()
  @IsNumber()
  readonly riderId: number;
}

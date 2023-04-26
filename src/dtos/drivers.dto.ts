import { IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class FinishRideDto {
  @IsNotEmpty()
  @IsLatitude()
  readonly endLocationLat: number;

  @IsNotEmpty()
  @IsLongitude()
  readonly endLocationLng: number;
}

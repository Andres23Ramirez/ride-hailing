import { Driver } from 'src/drivers/entities/driver.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Rider } from './rider.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startLocationLat: number;

  @Column()
  startLocationLng: number;

  @Column()
  endLocationLat: number;

  @Column()
  endLocationLng: number;

  @ManyToOne(() => Rider, (rider: Rider) => rider.rides)
  rider: Rider;

  @ManyToOne(() => Driver, (driver: Driver) => driver.rides)
  driver: Driver;

  @Column()
  status: string;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;
}

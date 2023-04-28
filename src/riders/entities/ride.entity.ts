import { Driver } from 'src/drivers/entities/driver.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Rider } from './rider.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  startLocationLat: number;

  @Column('decimal')
  startLocationLng: number;

  @Column('decimal', { nullable: true })
  endLocationLat: number;

  @Column('decimal', { nullable: true })
  endLocationLng: number;

  @ManyToOne(() => Rider, (rider: Rider) => rider.rides, { nullable: false })
  rider: Rider;

  @ManyToOne(() => Driver, (driver: Driver) => driver.rides, {
    nullable: false,
  })
  driver: Driver;

  @Column()
  status: string;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date', nullable: true })
  endTime: Date;
}

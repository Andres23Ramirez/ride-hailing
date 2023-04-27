import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'number' })
  startLocationLat: number;

  @Column({ type: 'number' })
  startLocationLng: number;

  @Column({ type: 'number' })
  endLocationLat: number;

  @Column({ type: 'number' })
  endLocationLng: number;

  @Column({ type: 'number' })
  riderId: number;

  @Column({ type: 'number' })
  driverId: number;

  @Column()
  status: string;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;
}

import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Ride } from './ride.entity';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  paymentSourceId: number;

  @OneToMany(() => Ride, (ride) => ride.rider)
  rides: Ride[];
}

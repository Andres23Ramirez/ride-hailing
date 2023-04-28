import { Ride } from 'src/riders/entities/ride.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Driver {
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
  rating: number;

  @OneToMany(() => Ride, (ride) => ride.rider)
  rides: Ride[];
}

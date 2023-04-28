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

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];
}

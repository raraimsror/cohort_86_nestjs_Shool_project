// 1. @Column — создаёт обычную колонку в таблице. У него есть свойство name.
// 2. @ManyToOne — создаёт связь между таблицами. У него нет свойства name для названия колонки.

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { INSURANCE_TYPES } from './enums/insurance.enum.js';
import { User } from '../users/users.entity.js';
import { Car } from '../cars/cars.entity.js';

@Entity()
export class Policy {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'type', nullable: false, type: 'enum', enum: INSURANCE_TYPES})
    type: INSURANCE_TYPES;
  @ManyToOne((): typeof User => User, { nullable: false })
    holder: User;
  @ManyToOne((): typeof User => User, { nullable: false })
    agent: User;

  //____________________________________________________
  @ManyToMany((): typeof Car => Car, { nullable: false })
  @JoinTable({ name: 'policies_cars', 
    joinColumn: { name: 'policies_id', referencedColumnName: 'id' }, 
    inverseJoinColumn: { name: 'car_id', referencedColumnName: 'id' } })
    cars: Car[];
  //____________________________________________________

  
  @Column({ name: 'coverage_in_cent', nullable: false, unique: false })
    coverageInCent: number;
  @Column({ name: 'issued_at', nullable: false, unique: false })
    issuedAt: Date;
  @Column({ name: 'expires_at', nullable: false, unique: false })
    expiresAt: Date;
  @Column({ name: 'active', nullable: false, unique: false })
    active: boolean;
}

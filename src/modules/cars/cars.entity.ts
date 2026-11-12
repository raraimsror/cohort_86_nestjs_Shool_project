import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity.js'

@Entity()
export class Car {
    @PrimaryGeneratedColumn({ name: 'id' })
        id: number;
    @Column({ name: 'brand', nullable: false, unique: false })
        brand: string;
    @Column({ name: 'model', nullable: false, unique: false })
        model: string;
    @Column({ name: 'year', nullable: false, unique: false })
        year: number;
    @Column({ name: 'vin', nullable: false, unique: false })
        vin: string;
    @Column({ name: 'color', nullable: false, unique: false })
        color: string;
    @Column({ name: 'owner', nullable: false, unique: false,   type: 'enum', enum: User })
        owner: User;
    @Column({ name: 'active', nullable: false, unique: false })
        active: boolean;
}


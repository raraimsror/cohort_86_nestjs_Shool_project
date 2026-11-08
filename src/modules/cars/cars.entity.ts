import { User } from '../users/users.entity.js'

export class Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    vin: string;
    color: string;
    owner: string;
    active: boolean;
}

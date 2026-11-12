import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Car } from './cars.entity.js'

@Injectable()
class CarsRepository {
  constructor(
    @InjectRepository(Car)
    private readonly repository: Repository<Car>,
  ) {}
  // Сохранить в машину в таблице БД
  async save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }
  // Найти все машины из таблицы БД, которые active: true
  async findAllActive(): Promise<Car[]> {
    return this.repository.findBy({ active: true });
  }
  // Найти car по id
  async findById(id: number): Promise<Car | null> {
    return this.repository.findOneBy({ id });
  }
  // Удалить car по id
  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
export { CarsRepository };0
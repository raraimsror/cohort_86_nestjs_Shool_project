import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Policy } from './policies.entity.js'

@Injectable()
class PoliciesRepository {
  constructor(
    @InjectRepository(Policy)
    private readonly repository: Repository<Policy>,
  ) {}
  // Сохранить в policy в таблице БД
  async save(policy: Policy): Promise<Policy> {
    return this.repository.save(policy);
  }
  // Найти все policies из таблицы БД, которые active: true
  async findAllActive(): Promise<Policy[]> {
    return this.repository.findBy({ active: true });
  }
  // Найти policy по id
  async findById(id: number): Promise<Policy | null> {
    return this.repository.findOne({ 
    where: { id }, relations:{ cars: true, }
     });
  }
  // Удалить policy по id
  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
export { PoliciesRepository };
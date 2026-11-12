// Service - файл, в котором мы изолируем бизнес логику нашего модуля
import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository.js';
import { User } from './users.entity.js';
import { ROLE } from '../users/enums/role.enum.js';

class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    user.role = ROLE.CLIENT; // Set default role to CLIENT
    user.active = true; // Set default active status to true
    return await this.repository.save(user); // Save the user to the database
  }

  async getAllActiveUsers(): Promise<User[]> {
    return await this.repository.findAllActive(); // Retrieve all active users from the database
  }

  async getActiveUserById(id: number): Promise<User | null> {
    const user = await this.repository.findById(id); // Retrieve a user by ID from the database
    if (!user || !user.active) {
      return null; // Return null if the user does not exist or is not active
    }
    return user; // Return the user if they exist and are active
  }

  async updateUser(id: number, user: User): Promise<void> {
    const foundedUser: User | null = await this.getActiveUserById(id); // Retrieve a user by ID from the database
    if (foundedUser) {
      foundedUser.name = user.name; // Update the user's name
      await this.repository.save(foundedUser); // Save the updated user to the database
    }
  }

  async deleteUserById(id: number): Promise<void> {
    const userForDelete: User | null = await this.getActiveUserById(id); // Retrieve a user by ID from the database
    if (userForDelete) {
      userForDelete.active = false; // Set the user's active status to false
      await this.repository.save(userForDelete); // Save the updated user to the database
    }
  }

  async restoreUserById(id: number): Promise<void> {
    const userForRestore: User | null = await this.getActiveUserById(id);
    if (userForRestore && !userForRestore?.active) {
      userForRestore.active = true; // Set the user's active status to true
      await this.repository.save(userForRestore); // Save the updated user to the database
    }
  }

  async setRole(id: number, role: ROLE): Promise<void> {
    const user: User | null = await this.getActiveUserById(id);
    if (user) {
      user.role = role;
      await this.repository.save(user);
    }
  }


}
export { UsersService };

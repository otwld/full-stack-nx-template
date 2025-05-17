import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entity';
import { GetAllUsersDTO } from './dtos/get-all-users.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {
  }

  /**
   * Find all users
   * @returns Promise with array of all users
   */
  async findAll(payload: GetAllUsersDTO): Promise<User[]> {
    return this.userModel.find(payload, {}, {limit: 300}).exec();
  }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns Promise with the user or null if not found
   */
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Find a user by a specific field
   * @param filter Filter query
   * @returns Promise with the user or null if not found
   */
  async findOneBy(filter: FilterQuery<User>): Promise<User | null> {
    return this.userModel.findOne(filter).exec();
  }

  /**
   * Create a new user
   * @param payload User data
   * @returns Promise with the created user
   */
  async create(payload: CreateUserDTO): Promise<User> {
    return this.userModel.create(payload);
  }

  /**
   * Update a user by ID
   * @param id User ID
   * @param payload Partial user data to update
   * @returns Promise with the updated user
   * @throws NotFoundException if user not found
   */
  async update(id: string, payload: Partial<CreateUserDTO>): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  /**
   * Delete a user by ID
   * @param id User ID
   * @returns Promise with the deleted user
   * @throws NotFoundException if user not found
   */
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }

  /**
   * Upsert a user (create if not exists, update if exists)
   * @param filter Filter query to find the user
   * @param payload User data to upsert
   * @returns Promise with the upserted user
   */
  async upsert(filter: FilterQuery<User>, payload: CreateUserDTO): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(filter, payload, { 
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      })
      .exec();

    return user;
  }
}

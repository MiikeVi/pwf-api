import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Entity, JSONPatch } from '../types';
import { applyPatch, createPatch } from 'rfc6902';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(
    query: any,
    page: number,
    limit: number,
    count: boolean,
  ): Promise<Entity<User>> {
    const usersData: User[] = await this.userModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!usersData)
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'No users found');

    if (!count) return { values: usersData };

    const countDocs: number = await this.userModel
      .countDocuments(query)
      .then((count) => count)
      .catch((err) => {
        throw Error(err);
      });

    return { values: usersData, count: countDocs };
  }

  async find(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no user with that id',
      );
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no user with that id',
      );
    }

    return user;
  }

  async create(userDto: User): Promise<User> {
    const createdUser = new this.userModel(userDto);
    if (!createdUser)
      throw new ConflictException(HttpStatus.CONFLICT, 'Cannot save user');

    return createdUser.save();
  }

  async update(patch: JSONPatch, userId: ObjectId) {
    const userToUpdate = await this.userModel.findById(userId).exec();

    if (!userToUpdate) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no user with that id',
      );
    }

    const userDtoUpdated = applyPatch(userToUpdate, patch as any);

    if (userDtoUpdated.filter((element) => !!element).length) {
      throw new Error(
        `Cannot patch: ${userDtoUpdated
          .map((error) => `${error.name}: ${error.message}`)
          .join(',')}`,
      );
    }
    return userToUpdate.save();
  }
}

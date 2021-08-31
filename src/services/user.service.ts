import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Users } from '../types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(
    query: any,
    page: number,
    limit: number,
    count: boolean,
  ): Promise<Users> {
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

  async create(userDto: User): Promise<User> {
    const createdUser = new this.userModel(userDto);
    if (!createdUser)
      throw new ConflictException(HttpStatus.CONFLICT, 'Cannot save user');

    return createdUser.save();
  }
}

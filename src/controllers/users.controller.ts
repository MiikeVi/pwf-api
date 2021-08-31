import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query: any) {
    const dbQuery: any = {};
    const page: number = parseInt(query.page) || 1;
    const limit: number = parseInt(query.limit) || 10;
    const count: boolean = query.count || false;

    return this.userService.findAll(dbQuery, page, limit, count);
  }

  @Get(':id')
  getUserById(@Param() params: any) {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }
    const dbQuery: any = { _id: params.id };

    return this.userService.find(dbQuery);
  }

  @Post()
  postUser(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }
}

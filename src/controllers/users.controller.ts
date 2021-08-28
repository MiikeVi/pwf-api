import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post()
  postUser(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }
}

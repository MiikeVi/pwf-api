import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as bcrypt from 'bcrypt';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query: any) {
    const dbQuery: any = {};
    const page: number = parseInt(query.page) || 1;
    const limit: number = parseInt(query.limit) || 10;
    const count: boolean = query.count || false;

    if (query.careTakerEnabled === 'true') {
      dbQuery.careTakerEnabled = query.careTakerEnabled;
    }

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
  async postUser(@Body() userData: User): Promise<User> {
    const clonedUser: User = JSON.parse(JSON.stringify(userData));
    const saltRounds = 10;

    return bcrypt
      .hash(userData.password, saltRounds)
      .then((hash: string) => {
        clonedUser.password = hash;
        return this.userService.create(clonedUser);
      })
      .catch((err) => err);
  }
}

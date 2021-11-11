import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as bcrypt from 'bcrypt';
import { JSONPatch } from 'src/types';
import { filter, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as fs from 'fs';

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

    if (query.city) {
      dbQuery.city = query.city;
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

  @Patch(':id')
  patchUser(
    @Body() userDataPatch: JSONPatch,
    @Param() params: any,
  ): Promise<User> {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }

    const dbQuery: any = { _id: params.id };
    return this.userService.update(userDataPatch, dbQuery);
  }

  @Post('upload')
  uploadImage(@Req() request): Observable<Record<string, unknown>> {
    const imagename = new Date().getTime().toString() + uuidv4() + '.jpeg';
    const buff = Buffer.from(JSON.stringify(request.body.base64), 'base64');
    fs.writeFileSync(
      join(process.cwd(), 'uploads/profile-images/' + imagename),
      buff,
    );
    return of({ imagePath: imagename });
  }

  @Get('profile-image/:imagename')
  getProfileImage(
    @Param('imagename') imagename,
    @Res() response,
  ): Observable<Record<string, unknown>> {
    return of(
      response.sendFile(
        join(process.cwd(), 'uploads/profile-images/' + imagename),
      ),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Result | null> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      return bcrypt
        .compare(pass.toString(), user.password.toString())
        .then(function (result) {
          return { user, result };
        });
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: (user as any)._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

type Result = {
  result: boolean;
  user: User;
};

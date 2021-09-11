import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<boolean | null> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      return bcrypt
        .compare(pass.toString(), user.password.toString())
        .then(function (result) {
          return result;
        });
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

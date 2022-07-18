import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByName(username);
    if (user && user.password === pass) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(_id: string, user: any) {
    const payload = { username: user.username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: createUserDto) {
    const hasUser = await this.userService.hasUser(user.username);
    if (hasUser) {
      return false;
    } else {
      return this.userService.createUser(user);
    }
  }
}

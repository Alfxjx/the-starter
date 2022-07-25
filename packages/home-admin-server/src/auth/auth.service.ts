import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthSignUpDTO } from './dto/signup.dto';
import { AuthSignInDTO } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByName(email);
    if (user && user.password === pass) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(_id: string, user: AuthSignInDTO) {
    const userExist = await this.userService.hasUser(user.email);
    if (!userExist) {
      throw new HttpException('Not Found this user', HttpStatus.NOT_FOUND);
    }
    const userFromDB = await this.userService.findUserById(_id);
    const payload = {
      username: userFromDB.username,
      email: userFromDB.email,
      sub: _id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      username: userFromDB.username,
      email: userFromDB.email,
      avatarUrl: userFromDB.avatarUrl,
    };
  }

  async signup(user: AuthSignUpDTO) {
    const hasUser = await this.userService.hasUser(user.email);
    if (hasUser) {
      throw new HttpException('this user Exists', HttpStatus.FORBIDDEN);
    } else {
      return this.userService.createUser({
        avatarUrl: '',
        ...user,
      });
    }
  }

  async logout() {
    return true;
  }
}

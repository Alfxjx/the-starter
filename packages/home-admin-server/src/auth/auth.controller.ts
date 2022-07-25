import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { MyLogger } from '../shared/logger/logger.service.';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthSignInDTO } from './dto/signin.dto';
import { AuthSignUpDTO } from './dto/signup.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new MyLogger(AuthController.name);

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() reqSignin: AuthSignInDTO, @Request() req) {
    const _id = req.user._doc._id;
    const res = await this.authService.login(_id, reqSignin);
    return res;
  }

  @Post('logout')
  async logout() {
    // TODO
    const res = await this.authService.logout();
    return res;
  }

  @Post('signup')
  async signup(@Body() req: AuthSignUpDTO) {
    const res = await this.authService.signup(req);
    if (!res) {
      throw new HttpException('already has user', HttpStatus.FORBIDDEN);
    }
    return res;
  }
}

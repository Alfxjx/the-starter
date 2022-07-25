import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { MyLogger } from '../../shared/logger/logger.service.';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  private logger = new MyLogger();

  async validate(email: string, password: string): Promise<any> {
    this.logger.log(email, password);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('local strategy failed', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

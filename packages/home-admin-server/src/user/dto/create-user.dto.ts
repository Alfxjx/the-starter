import { AuthSignUpDTO } from '../../auth/dto/signup.dto';

export class CreateUserDto extends AuthSignUpDTO {
  readonly avatarUrl?: string;
}

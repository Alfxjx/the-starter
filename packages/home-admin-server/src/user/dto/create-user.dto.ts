import { AuthSignUpDTO } from '../../auth/dto/signup.dto';
import { Role } from '../../auth/roles/roles.enum';

export class CreateUserDto extends AuthSignUpDTO {
  readonly avatarUrl?: string;
  readonly role: Role[];
}

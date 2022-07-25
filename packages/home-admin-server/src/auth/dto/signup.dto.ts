import { Role } from '../roles/roles.enum';
export class AuthSignUpDTO {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly role: Role[];
}

import { Role } from '../../auth/roles/roles.enum';

export class UpdateUserDto {
  readonly _id: string;
  readonly email: string;
  readonly username?: string;
  readonly password?: string;
  readonly avatarUrl?: string;
  readonly role?: Role[];
}

export class UpgradeDTO {
  readonly _id: string;
  readonly role: Role[];
}

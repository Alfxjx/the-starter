export class UpdateUserDto {
  readonly _id: string;
  readonly email: string;
  readonly username?: string;
  readonly password?: string;
  readonly avatarUrl?: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/roles/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, default: Date.now })
  createedAt: Date;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

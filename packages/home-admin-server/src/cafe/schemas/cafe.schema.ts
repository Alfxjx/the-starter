import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CafeDocument = Cafe & Document;

@Schema()
export class Cafe extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  category: string;

  @Prop()
  isHot: boolean;

  @Prop()
  price: number;

}

export const CafeSchema = SchemaFactory.createForClass(Cafe);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BeanDocument = Bean & Document;

@Schema()
export class Bean extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

}

export const BeanSchema = SchemaFactory.createForClass(Bean);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment extends Document {

  @Prop()
  createdAt: Date;

  @Prop()
  customerName: string;

  @Prop()
  cafeID: string;


  @Prop()
  cafeName: string;

  @Prop()
  beanID: string;

  @Prop()
  beanName: string;

  @Prop()
  income: number;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

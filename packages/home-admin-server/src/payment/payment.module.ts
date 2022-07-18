import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { BeanModule } from '../bean/bean.module';
import { CafeModule } from '../cafe/cafe.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema }
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'hwsmtp.exmail.qq.com',
        port: 465,
        auth: {
          user: process.env.MAIL_NAME,
          pass: process.env.MAIL_PASS
        }
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    CafeModule,
    BeanModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer'

import { MyLogger } from '../shared/logger/logger.service.';
import { PaymentDTO } from './dto/payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';

import { BeanService } from '../bean/bean.service';
import { CafeService } from '../cafe/cafe.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly cafe$: CafeService,
    private readonly bean$: BeanService,
    private readonly mail$: MailerService,
  ) { }

  private logger = new MyLogger(PaymentService.name);

  async findAll(): Promise<Payment[]> {
    const list = await this.paymentModel.find().exec();
    return list;
  }

  async findOneByID(id: string): Promise<Payment> {
    this.logger.log(`payment: ${id}`);
    return this.paymentModel.findOne({ _id: id }).exec();
  }

  async addNewOne(DTO: PaymentDTO): Promise<Payment> {
    const createdAt = new Date();
    const cafe = await this.cafe$.findOneByID(DTO.cafeID);
    let bean;
    let sum = 0;
    if (DTO.beanID) {
      bean = await this.bean$.findOneByID(DTO.beanID);
      sum = cafe.price + bean.price;
    } else {
      sum = cafe.price;
    }
    const create = await this.paymentModel.create({
      createdAt,
      cafeName: cafe.name,
      beanName: bean?.name,
      income: sum,
      ...DTO
    });
    await this.sendMail(create, cafe);
    return create;
  }

  async sendMail(create, cafe) {
    const text = `${create.customerName} 下单了一杯咖啡： 「${cafe.isHot ? '热' : '冰'}」 ${create.cafeName}, 种类：${cafe.category}${create.beanName ? ', 豆子：' + create.beanName : "。"}`;
    this.logger.log(text);
    await this.mail$.sendMail({
      to: process.env.MAIL_RECEIVER,
      from: process.env.MAIL_NAME,
      subject: '您有新的咖啡订单',
      text: text,
    }).then(() => {
      this.logger.log('发信成功')
    }).catch(() => {
      this.logger.error('发信失败')
    });
  }

  async updateOne(id: string, DTO: PaymentDTO): Promise<Payment> {
    const update = await this.paymentModel.findByIdAndUpdate(id, DTO);
    const res = await this.findOneByID(id);
    return res;
  }

  async delByID(id): Promise<Payment> {
    this.logger.log(`del payment: ${id}`);
    const del = await this.paymentModel.findByIdAndRemove({ _id: id }).exec();
    return del;
  }
}

import { Body, Controller, Post, Get } from '@nestjs/common';

import { PaymentDTO } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly pay$: PaymentService,

  ) { }

  @Get()
  async findAll() {
    const res = await this.pay$.findAll();
    return res;
  }

  @Post()
  async payment(@Body() DTO: PaymentDTO) {
    const res = await this.pay$.addNewOne(DTO);
    return res;
  }

}

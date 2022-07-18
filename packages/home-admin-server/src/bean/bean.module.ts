import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BeanController } from './bean.controller';
import { BeanService } from './bean.service';
import { Bean, BeanSchema } from './schemas/bean.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Bean.name, schema: BeanSchema }
  ])],
  controllers: [BeanController],
  providers: [BeanService],
  exports: [BeanService]
})
export class BeanModule { }

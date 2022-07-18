import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BeanDTO } from './dto/bean.dto';
import { Bean, BeanDocument } from './schemas/bean.schema';

@Injectable()
export class BeanService {
  constructor(
    @InjectModel(Bean.name)
    private readonly beanModel: Model<BeanDocument>,
  ) { }

  private logger = new Logger(BeanService.name);

  async findAll(): Promise<Bean[]> {
    const list = await this.beanModel.find().exec();
    return list;
  }

  async findOneByID(id: string): Promise<Bean> {
    this.logger.log(`cafe: ${id}`);
    return this.beanModel.findOne({ _id: id }).exec();
  }

  async addNewOne(DTO: BeanDTO): Promise<Bean> {
    const create = await this.beanModel.create(DTO);
    return create;
  }

  async updateOne(id: string, DTO: BeanDTO): Promise<Bean> {
    const update = await this.beanModel.findByIdAndUpdate(id, DTO);
    const res = await this.findOneByID(id);
    return res;
  }

  async delByID(id): Promise<Bean> {
    this.logger.log(`del cafe: ${id}`);
    const del = await this.beanModel.findByIdAndRemove({ _id: id }).exec();
    return del;
  }
}

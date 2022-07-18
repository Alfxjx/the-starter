import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CafeDTO } from './dto/cafe.dto';
import { Cafe, CafeDocument } from './schemas/cafe.schema';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>,
  ) { }

  private logger = new Logger(CafeService.name);

  async findAll(): Promise<Cafe[]> {
    const list = await this.cafeModel.find().exec();
    return list;
  }

  async findOneByID(id: string): Promise<Cafe> {
    this.logger.log(`cafe: ${id}`);
    return this.cafeModel.findOne({ _id: id }).exec();
  }

  async addNewOne(DTO: CafeDTO): Promise<Cafe> {
    const create = await this.cafeModel.create(DTO);
    return create;
  }

  async updateOne(id: string, DTO: CafeDTO): Promise<Cafe> {
    const update = await this.cafeModel.findByIdAndUpdate(id, DTO);
    const res = await this.findOneByID(id);
    return res;
  }

  async delByID(id): Promise<Cafe> {
    this.logger.log(`del cafe: ${id}`);
    const del = await this.cafeModel.findByIdAndRemove({ _id: id }).exec();
    return del;
  }
}

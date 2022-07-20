import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MyLogger } from '../shared/logger/logger.service.';

@Injectable()
export class ProductsService {
  private logger = new MyLogger();

  create(createProductDto: CreateProductDto) {
    this.logger.log(JSON.stringify(createProductDto));
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.logger.log(JSON.stringify(updateProductDto));
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

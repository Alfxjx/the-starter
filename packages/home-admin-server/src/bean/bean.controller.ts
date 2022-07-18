import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BeanService } from './bean.service';
import { BeanDTO } from './dto/bean.dto';

@Controller('bean')
export class BeanController {
  constructor(private readonly bean$: BeanService) { }


  @Get('')
  async findList() {
    return this.bean$.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addNewOne(@Body() DTO: BeanDTO) {
    const res = await this.bean$.addNewOne(DTO);
    return res;
  }


  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateCafe(@Body() DTO: { id: string, dto: BeanDTO }) {
    const res = await this.bean$.updateOne(DTO.id, DTO.dto);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Post('del/:id')
  async delByID(@Param('id') id) {
    const res = await this.bean$.delByID(id);
    return res;
  }
}

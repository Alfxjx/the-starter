import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CafeService } from './cafe.service';
import { CafeDTO } from './dto/cafe.dto';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafe$: CafeService) {

  }

  @Get('')
  async findList() {
    return this.cafe$.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addNewOne(@Body() DTO: CafeDTO) {
    const res = await this.cafe$.addNewOne(DTO);
    return res;
  }


  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateCafe(@Body() DTO: { id: string, dto: CafeDTO }) {
    const res = await this.cafe$.updateOne(DTO.id, DTO.dto);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Post('del/:id')
  async delByID(@Param('id') id) {
    const res = await this.cafe$.delByID(id);
    return res;
  }
}

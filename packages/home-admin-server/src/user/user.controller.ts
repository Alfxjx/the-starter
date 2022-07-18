import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MyLogger } from '../shared/logger/logger.service.';
import { createUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new MyLogger(UserController.name);

  @Get()
  async userList(): Promise<User[]> {
    return this.userService.getList();
  }

  @Get(':id')
  async userInfo(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Patch('update')
  async updateUserInfo(
    @Request() req,
    @Body() requestData: Partial<createUserDto>
  ) {
    this.logger.log(requestData);
    const user = await this.userService.findUserById(req.user._id);
    if (!user) {
      throw new HttpException('error happens', 400);
    }
    const res = await this.userService.updateUser({
      _id: user._id,
      ...requestData,
    });
    if (!res) {
      throw new HttpException('error happens', 400);
    }
    return res;
  }

  @Post('create')
  async create(@Body() requestData: createUserDto) {
    this.logger.log(requestData);
    const res = await this.userService.createUser(requestData);
    if (!res) {
      throw new HttpException('error happens', 400);
    }
    return res;
  }
}

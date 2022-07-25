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
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UpdateUserDto, UpgradeDTO } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';

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
  async updateUserInfo(@Request() req, @Body() requestData: UpdateUserDto) {
    this.logger.log(requestData);
    const user = await this.userService.findUserById(req.user._id);
    if (!user) {
      throw new HttpException('error happens', HttpStatus.NOT_FOUND);
    }
    const res = await this.userService.updateUser({
      _id: user._id,
      ...requestData,
    });
    if (!res) {
      throw new HttpException('error happens', HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Post('create')
  async create(@Body() requestData: CreateUserDto) {
    this.logger.log(requestData);
    const res = await this.userService.createUser(requestData);
    if (!res) {
      throw new HttpException('error happens', HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Post('mutate-role')
  async upgrade(@Body() req: UpgradeDTO) {
    const res = await this.userService.roleMutator(req);
    return res;
  }
}

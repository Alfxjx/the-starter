import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { signinDto } from './dto/signin.dto';
import { MyLogger } from '../shared/logger/logger.service.';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  private readonly logger = new MyLogger(UserService.name);

  async getList() {
    const list = await this.userModel.find();
    return list;
  }

  /**
   * @description
   * @author xujx
   * @date 2022-04-27
   * @param {string} username
   * @returns {*}
   * @memberof UserService
   */
  async findUserByName(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  /**
   * @description
   * @author xujx
   * @date 2022-04-27
   * @param {string} username
   * @returns {*}
   * @memberof UserService
   */
  async hasUser(username: string) {
    const hasUser = await this.findUserByName(username);
    return !(hasUser === null);
  }

  /**
   * @description
   * @author xujx
   * @date 2022-04-27
   * @param {createUserDto} user
   * @returns {*}
   * @memberof UserService
   */
  async createUser(user: createUserDto) {
    const resp = await this.hasUser(user.username);
    if (resp) {
      this.logger.warn(`already has user ${user.username}`);
      return;
    }
    const res = await this.userModel.create(user);
    this.logger.log(res);
    return res;
  }

  /**
   * @description
   * @author xujx
   * @date 2022-04-27
   * @param {*} _id
   * @param {updateUserDto} user
   * @returns {*}
   * @memberof UserService
   */
  async updateUser(user: updateUserDto) {
    const resp = await this.hasUser(user.username);
    if (!resp) {
      this.logger.warn(`no user called ${user.username}`);
      return;
    }
    const { _id, ...rest } = user;
    await this.userModel.findByIdAndUpdate(_id, rest);
    const user$ = await this.userModel.findById(_id);
    return user$;
  }

  async signin(req: signinDto) {
    const hasUser = await this.findUserByName(req.username);
    if (!hasUser) {
      throw new HttpException('unkown user', 401);
    }
    if (req.password !== hasUser.password) {
      throw new HttpException('password error', 401);
    }
    return hasUser;
  }
}

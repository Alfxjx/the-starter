import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyLogger } from '../shared/logger/logger.service.';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
   * @param {string} email
   * @returns {*}
   * @memberof UserService
   */
  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
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
   * @param {string} email
   * @returns {*}
   * @memberof UserService
   */
  async hasUser(email: string) {
    const hasUser = await this.findUserByEmail(email);
    return !(hasUser === null);
  }

  /**
   * @description
   * @author xujx
   * @date 2022-04-27
   * @param {CreateUserDto} user
   * @returns {*}
   * @memberof UserService
   */
  async createUser(user: CreateUserDto) {
    const resp = await this.hasUser(user.email);
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
   * @param {UpdateUserDto} user
   * @returns {*}
   * @memberof UserService
   */
  async updateUser(user: UpdateUserDto) {
    const resp = await this.hasUser(user.email);
    if (!resp) {
      this.logger.warn(`no user emailed as ${user.email}`);
      return;
    }
    const { _id, ...rest } = user;
    await this.userModel.findByIdAndUpdate(_id, rest);
    const user$ = await this.userModel.findById(_id);
    return user$;
  }
}

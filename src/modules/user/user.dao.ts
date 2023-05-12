import { User } from '@/database/entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /** 根据uid查找用户 */
  async findUserByUid(uid: number) {
    const userInfo = await this.userRepo.findOne({
      where: { uid },
      select: ['uid', 'wechatAvatarUrl', 'nickname', 'gender', 'phone'],
    });
    if (!userInfo) {
      throw new HttpException('找不到用户', 200);
    }
    return userInfo;
  }

  /** 根据手机号查找用户 */
  async findUserByPhone(phone: number) {
    const userInfo = await this.userRepo.findOne({
      where: { phone },
      select: ['uid', 'wechatAvatarUrl', 'nickname', 'gender', 'phone'],
    });
    if (!userInfo) {
      throw new HttpException('找不到用户', 200);
    }
    return userInfo;
  }

  /**
   * 创建用户
   */
  async create(user: CreateUserDto, transaction: EntityManager) {
    const inserUser = this.userRepo.create(user);
    const ret = await transaction.insert(User, inserUser);
    return ret.identifiers[0].id;
  }
}

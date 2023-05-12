import { User } from '@/database/entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { log } from 'console';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /** 查找用户 */
  async findUser(user) {
    const userInfo = await this.userRepo.findOne({
      where: { ...user },
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
    return ret.identifiers[0].uid;
  }
}

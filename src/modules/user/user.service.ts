import { HttpException, Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, getConnection } from 'typeorm';
import { User } from '@/database/entities/user.entity';
import { DEAFULT_USER_AVATAR } from './user.constant';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userDao: UserDao,
  ) {}

  /** 查找用户 */
  async findUser(user) {
    return await this.userDao.findUser(user);
  }

  async findOneByPhone(phone: string) {
    return await this.userRepo.findOne({ phone });
  }

  /**
   *  创建用户
   */
  async create(user: CreateUserDto) {
    let uid;
    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        uid = await this.userDao.create(user, transactionalEntityManager);
      });
      return uid;
    } catch (error) {
      throw new HttpException('用户创建失败', 200);
    }
  }

  /**
   * 根据手机号创建用户
   */
  async createUserByPhone(phone: string) {
    const newUser = new User();
    newUser.nickname = 'USER-' + Math.floor(Math.random() * 999999);
    newUser.wechatAvatarUrl = DEAFULT_USER_AVATAR;
    newUser.phone = phone + '';
    return await this.create(newUser);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { CreateUserDto } from './dto/create-user.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}
  /** 根据uid查找用户 */
  async findUserByUid(uid: number) {
    return await this.userDao.findUserByUid(uid);
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
      throw new HttpException('文章创建失败', 200);
    }
  }
}
